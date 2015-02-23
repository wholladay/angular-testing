/* global angular */
var movies = angular.module('myApp.movies', ['ngRoute']);

movies.config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider.when('/movies', {
        templateUrl: 'movies/movies.html',
        controller: 'MovieController'
    });
}]);

movies.controller('MovieController', ['$scope', 'MovieService', function($scope, MovieService) {
    'use strict';

    function getMovies() {
        MovieService.getMovies().then(function(data) {
            $scope.movies = data;
        });
    }

    function init() {
        getMovies();
    }

    init();
}]);