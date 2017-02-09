define(["app"], function () {

    var app = angular.module("myapp", [ "ngAnimate", "ngAria", "ngMessages", "ngMaterial"]);

    // Here "app" global module register all the providers 
    // To know more about providers follow the angular online documentation.
    app.config(function ($routeProvider, $controllerProvider, $provide, $compileProvider, $filterProvider, $httpProvider) {
        app.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };               
    });    

    //Configure the angular-material theme.
    app.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    });

    return app;
});


// define(["app"], function (app) {
//     // We register a controller here
//     app.register.controller("ctrl1", function ($scope, $rootScope, $state) {
//         // Few lines of code for my angular-material calender control.
//         $scope.msg = 'teste';
//     });

// });