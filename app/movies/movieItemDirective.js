/* global myApp */
myApp.directive('movieItem', ['MovieService', function(MovieService) {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            movie: '='
        },
        templateUrl: 'movies/movieItem.html',
        link: function(scope, element) {

            MovieService.getRatings().then(function(ratings) {
                scope.movie.ratingName = ratings['rating' + scope.movie.rating];
            });
            MovieService.getGenres().then(function(genres) {
                scope.movie.genreName = genres['genre' + scope.movie.genre];
                scope.movie.subGenreName = genres['genre' + scope.movie.subGenre];
            });
            MovieService.getFormats().then(function(formats) {
                scope.movie.formatName = formats['format' + scope.movie.format];
            });
        }
    };
}]);