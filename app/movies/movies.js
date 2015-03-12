/* global myApp */
myApp.controller('MovieController', ['$scope', 'MovieService', '$mdSidenav', function($scope, MovieService, $mdSidenav) {
    'use strict';
    var self = this;

    self.toggleMenu = toggleMenu;
    //self.filterFunc = filterBy;
    self.criteriaMatch = criteriaMatch;
    self.movies = [];
    self.ratings = ['Any'];
    self.formats = ['Any'];
    self.criteria = {
        //rating: self.ratings[0].label
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

    function criteriaMatch(criteria) {
        return function(item) {

            if (criteria.title && !item.title.match(new RegExp(criteria.title, 'i'))) {
                return false;
            } else if (criteria.rating && criteria.rating !== 'Any' && item.ratingName !== criteria.rating) {
                return false;
            } else if (criteria.format && criteria.format !== 'Any' && item.formatName !== criteria.format) {
                return false;
            }

            return true;
        };
    }

    //function filterBy(value) {
    //    if (self.titleVal && value.title.indexOf(self.titleVal) === -1) {
    //        return false;
    //    }
    //    return true;
    //}

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

    getMovies();
    getRatings();
    getFormats();
}]);