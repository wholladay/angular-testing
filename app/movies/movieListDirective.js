/* global myApp, angular */
myApp.directive('movieList', ['MovieService', function(MovieService) {
    'use strict';
    return {
        restrict: 'AE',
        templateUrl: 'movies/movieList.html',
        scope: {
            orderSetting: '@orderBy',
            criteria: '='
        },
        link: function(scope, element) {

            /**
             * @method criteriaMatch
             * @desc
             * @param criteria
             * @returns {Function}
             */
            scope.criteriaMatch = function criteriaMatch(criteria) {
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
            };

            function compareByGenre(movie1, movie2) {
                var result = movie1.genreName.localeCompare(movie2.genreName);
                if (!result) {
                    result = movie1.subGenreName.localeCompare(movie2.subGenreName);
                    if (!result) {
                        result = movie1.title.localeCompare(movie2.title);
                        if (!result) {
                            return movie1.number - movie2.number;
                        }
                        return result;
                    }
                    return result;
                }
                return result;
            }

            function sortByGenre() {
                if (scope.movies.length > 0 && scope.orderSetting === 'genre') {
                    scope.movies.sort(compareByGenre);
                    scope.moviesByGenre = [];
                    var currentGroup = {name: null};
                    angular.forEach(scope.movies, function(movie) {
                        var groupName = movie.genreName + ' - ' + movie.subGenreName;
                        if (groupName !== currentGroup.name) {
                            currentGroup = {name: groupName, movies: [movie]};
                            scope.moviesByGenre.push(currentGroup);
                        } else {
                            currentGroup.movies.push(movie);
                        }
                    });
                }
            }

            function init() {

                scope.movies = [];
                scope.moviesByGenre = [];

                MovieService.getJoinedMovies().then(function(movies) {
                    scope.movies = movies;
                    sortByGenre();
                });

                scope.$watch('orderSetting', function(newVal) {
                    sortByGenre();
                });
            }

            init();
        }
    };
}]);