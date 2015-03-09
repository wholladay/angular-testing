/* global myApp */
myApp.directive('movieItem', function() {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            movie: '='
        },
        templateUrl: 'movies/movieItem.html'
    };
});