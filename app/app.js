/* global angular */
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.services',
    //'myApp.movies',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]);

myApp.config(['$routeProvider', '$mdIconProvider', function($routeProvider, $mdIconProvider) {
    'use strict';
    $routeProvider.otherwise({redirectTo: '/view1'});
    $mdIconProvider.icon("menu", "./assets/svg/menu.svg", 24);
}]);