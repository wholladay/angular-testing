/* global angular */
var view1 = angular.module('myApp.view1', ['ngRoute']);

view1.config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}]);

view1.controller('View1Ctrl', [function() {
    'use strict';

}]);