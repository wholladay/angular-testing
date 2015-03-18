/* global angular */
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngMaterial',
    'myApp.services'
]);

myApp.config(['$mdIconProvider', '$httpProvider', function($mdIconProvider, $httpProvider) {
    'use strict';
    $mdIconProvider.icon("menu", "./assets/svg/menu.svg", 24);
    $httpProvider.defaults.cache = true;
}]);