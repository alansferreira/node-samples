require.config({
    urlArgs: "bust=v" + new Date().getTime() // apply no-cache
});

// declare app and modules
var app = angular.module('app', ['ngRoute']);
 
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
      templateUrl : 'views/home.html',
      controller  : 'homeController',
      resolve: {
        load: function ($q, $rootScope) {
          var deferred = $q.defer();
          
          require (['views/home-controller'], function () {$rootScope.$apply(function () { deferred.resolve(); });});

          return deferred.promise;
        }
      }
    })
    // Lazy loading routing
    .when('/about/:id?', {
      templateUrl : 'views/about.html',
      controller  : 'aboutController',
      resolve: {
        load: function ($q, $rootScope) {
          var deferred = $q.defer();
          
          require (['views/about-controller'], function () {$rootScope.$apply(function () { deferred.resolve(); });});
          
          return deferred.promise;
        }
      }
    })
    // Lazy loading routing
    .when('/contact', {
      templateUrl : 'views/contact.html',
      controller  : 'contactController',
      resolve: {
        load: function ($q, $rootScope) {
          var deferred = $q.defer();
          
          require (['views/contact-controller'], function () {$rootScope.$apply(function () { deferred.resolve(); });});
          
          return deferred.promise;
        }
      }
    });
});