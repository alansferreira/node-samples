require.config({
    urlArgs: "bust=v" + new Date().getTime() // apply no-cache
});


var app = angular.module('app', ['ngMaterial', 'ngRoute']);


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

  /* Routes */
  $routeProvider
    // Lazy loading routing
    .when('/', {
      templateUrl : '/myapp/page/home',
      controller  : 'homeController',
      resolve: {
        load: function ($q, $rootScope) {
          var deferred = $q.defer();
          
          require (['/controllers/home-controller.js'], function () {$rootScope.$apply(function () { deferred.resolve(); });});

          return deferred.promise;
        }
      }
    })
    // Lazy loading routing
    .when('/about', {
      templateUrl : '/myapp/page/about',
      controller  : 'aboutController',
      resolve: {
        load: function ($q, $rootScope) {
          var deferred = $q.defer();
          
          require (['/controllers/about-controller.js'], function () {$rootScope.$apply(function () { deferred.resolve(); });});
          
          return deferred.promise;
        }
      }
    })
    // Lazy loading routing
    .when('/contact', {
      templateUrl : '/myapp/page/contact',
      controller  : 'contactController',
      resolve: {
        load: function ($q, $rootScope) {
          var deferred = $q.defer();
          
          require (['controllers/contact-controller.js'], function () {$rootScope.$apply(function () { deferred.resolve(); });});
          
          return deferred.promise;
        }
      }
    });
});