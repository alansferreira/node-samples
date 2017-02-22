require.config({
    urlArgs: "bust=v" + new Date().getTime() // apply no-cache
});


var app = angular.module('app', ['ngMaterial', 'ngRoute']);

