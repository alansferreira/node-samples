
// declare app and modules
var app = angular.module('app', [	
  'ngMaterial', 
	'ngAnimate', 
	'ngMessages', 
	'ngResource', 
	'ngLocale', 
	'ngSanitize', 
	'ngMdIcons', 
	'ngRoute'
]);
 
// Prepare configuration to lazy load items based on route
app.config(function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider) {


  // save references to the providers so we can lazy load items later
  app.lazy = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service,
  };

  $locationProvider.html5Mode(false).hashPrefix('');

  var fnDynamicLoad = function(deps){
    return function ($q, $rootScope) {
      var deferred = $q.defer();
      
      require (deps, function () {
        $rootScope.$apply(function () { 
          deferred.resolve(); 
        });
      });

      return deferred.promise;
    };
  };

  /* Routes */
  $routeProvider
    // Lazy loading routing
    .when('/', {
      templateUrl : 'views/home.html',
      controller  : 'homeController',
      resolve: { load: fnDynamicLoad(['views/home-controller']) }
    })
    // Lazy loading routing
    .when('/jobs/:id?', {
      templateUrl : 'views/job-list.html',
      controller  : 'jobController',
      resolve: { load: fnDynamicLoad(['$http-factory/$http-job', 'views/job-controller']) }
    })
    // Lazy loading routing
    .when('/contact', {
      templateUrl : 'views/contact.html',
      controller  : 'contactController',
      resolve: { load: fnDynamicLoad(['views/contact-controller']) }
    });
});


var appCtrl = app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	$scope.toggleLeft = buildDelayedToggler('left');
	$scope.toggleRight = buildToggler('right');
			
	$scope.isOpenRight = function() {
		return $mdSidenav('right').isOpen();
	};

	/**
	 * Supplies a function that will continue to operate until the time
	 * is up.
	 */
	function debounce(func, wait, context) {
		var timer;

		return function debounced() {
			var context = $scope, args = Array.prototype.slice
					.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	}

	/**
	 * Build handler to open/close a SideNav; when animation finishes
	 * report completion in console
	 */
	function buildDelayedToggler(navID) {
		return debounce(function() {
			// Component lookup should always be available since we are
			// not using `ng-if`
			$mdSidenav(navID).toggle().then(function() {
				$log.debug("toggle " + navID + " is done");
			});
		}, 200);
	}

	function buildToggler(navID) {
		return function() {
			// Component lookup should always be available since we are
			// not using `ng-if`
			$mdSidenav(navID).toggle().then(function() {
				$log.debug("toggle " + navID + " is done");
			});
		}
	}
});