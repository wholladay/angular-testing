/* global myApp */
myApp.controller('MovieController', ['$scope', 'MovieService', '$mdSidenav', function($scope, MovieService, $mdSidenav) {
    'use strict';
    var self = this;

    self.toggleMenu = toggleMenu;
    self.filterFunc = filterBy;
    self.criteriaMatch = criteriaMatch;
    self.movies = [];
    self.ratings = [
        {label: 'Any', value: 0},
        {label: 'G', value: 1},
        {label: 'PG', value: 2},
        {label: 'PG-13', value: 3}
    ];
    self.formats = [
        {label: 'Any', value: 0},
        {label: 'VHS', value: 1},
        {label: 'DVD', value: 2},
        {label: 'Blu-ray', value: 3}
    ];
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
            } else if (criteria.rating && criteria.rating !== 'Any' && item.rating !== criteria.rating) {
                return false;
            } else if (criteria.format && criteria.format !== 'Any' && item.format !== criteria.format) {
                return false;
            }

            return true;
        };
    }

    function filterBy(value) {
        if (self.titleVal && value.title.indexOf(self.titleVal) === -1) {
            return false;
        }
        return true;
    }

    function getMovies() {
        MovieService.getMovies().then(function(data) {
            self.movies = data;
        });
    }

    getMovies();

}]);