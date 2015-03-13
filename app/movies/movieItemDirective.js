/* global myApp */
myApp.directive('movieItem', ['MovieService', function(MovieService) {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            movie: '='
        },
        templateUrl: 'movies/movieItem.html',
        link: function(scope) {
        }
    };
}]);