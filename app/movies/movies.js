/* global myApp */
myApp.controller('MovieController', ['$scope', 'MovieService', '$mdSidenav', function($scope, MovieService, $mdSidenav) {
    'use strict';
    var self = this;

    self.toggleMenu = toggleMenu;
    self.orderBy = 'title';
    self.movies = [];
    self.ratings = ['Any'];
    self.formats = ['Any'];
    self.criteria = {
    };

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

    function getRatings() {
        MovieService.getRatings().then(function(ratings) {
            var key;
            for (key in ratings) {
                if (ratings.hasOwnProperty(key)) {
                    self.ratings.push(ratings[key]);
                }
            }
        });
    }

    function getFormats() {
        MovieService.getFormats().then(function(formats) {
            var key;
            for (key in formats) {
                if (formats.hasOwnProperty(key)) {
                    self.formats.push(formats[key]);
                }
            }
        });
    }

    getRatings();
    getFormats();
    getMovies();
}]);