require.config({
    urlArgs: "bust=v" + new Date().getTime() // apply no-cache
});


var app = angular.module('app', ['ngMaterial', 'ngMdIcons', 'ngRoute']);





var layoutController = app.controller('LayoutController', function($scope, $timeout, $mdSidenav, $log) {
	$scope.groups = [
		{
			label: "Gerenciamento",
			items: [
				{label: "Alertas", url: '/', icon:'notifications_active'    , badge: 250, }, 
				]
		}, 
		{
			label: "Cadastros",
			items: [
					{label: "EPI´s", url: '/admin/epi', icon:'verified_user', badge: null, }, 
					{label: "Ambientes", url: '/admin/ambiente', icon:'place', badge: null, }, 
					{label: "Funcionário", url: '/admin/funcionario', icon:'person', badge: null, }
				]
		}, 
	];
	 
	$scope.isActiveMenu = function(item){
		return window.location.href.toLowerCase().endsWith(item.url.toLowerCase());
	};
	
	$scope.open = function(item){
		window.open(item.url, '_self');
	};
	
	$scope.close = function() {
		$mdSidenav('left').close().then(function() {
			$log.debug("close LEFT is done");
		});
	};


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
 