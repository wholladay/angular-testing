/* global angular */
var view2 = angular.module('myApp.view2', ['ngRoute']);

view2.config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    });
}]);

view2.controller('View2Ctrl', [function() {
    'use strict';
}]);