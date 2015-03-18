/* global myApp */
//myApp.controller('MoviesController', ['$scope', 'MovieService', '$mdSidenav', function($scope, MovieService, $mdSidenav) {
myApp.controller('MoviesController', ['MovieService', '$mdSidenav', function(MovieService, $mdSidenav) {
    'use strict';
    var self = this;

    self.toggleMenu = toggleMenu;
    self.orderByValues = ['title', 'number', 'genre'];
    self.orderBy = self.orderByValues[0];
    self.ratings = ['Any'];
    self.formats = ['Any'];
    self.criteria = {};

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleMenu() {
        $mdSidenav('left').toggle();
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
}]);