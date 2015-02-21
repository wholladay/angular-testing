/* global angular */
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
