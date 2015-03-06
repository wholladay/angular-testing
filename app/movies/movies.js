/* global myApp */
myApp.controller('MovieController', ['$scope', 'MovieService', '$mdSidenav', function($scope, MovieService, $mdSidenav) {
    'use strict';
    var self = this;

    self.toggleMenu = toggleMenu;
    self.movies = [];

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleMenu() {
        $mdSidenav('left').toggle();
    }

    function getMovies() {
        MovieService.getMovies().then(function(data) {
            self.movies = data;
        });
    }

    getMovies();

}]);