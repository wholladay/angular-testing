/* global angular */
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngMaterial',
    'myApp.services',
    'myApp.version'
]);

myApp.config(['$mdIconProvider', function($mdIconProvider) {
    'use strict';
    $mdIconProvider.icon("menu", "./assets/svg/menu.svg", 24);
}]);