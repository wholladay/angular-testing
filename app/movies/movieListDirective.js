/* global myApp, angular */
myApp.directive('movieList', ['$filter', 'MovieService', function($filter, MovieService) {
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
             * @returns {Function}
             */
            scope.criteriaMatch = function criteriaMatch() {
                return function(item) {

                    if (scope.criteria.title && !item.title.match(new RegExp(scope.criteria.title, 'i'))) {
                        return false;
                    } else if (scope.criteria.rating && scope.criteria.rating !== 'Any' && item.ratingName !== scope.criteria.rating) {
                        return false;
                    } else if (scope.criteria.format && scope.criteria.format !== 'Any' && item.formatName !== scope.criteria.format) {
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
                    // First filter the list of movies.
                    var filteredMovies = $filter('filter')(scope.movies, scope.criteriaMatch());
                    // Then sort the filtered movies by genre.
                    filteredMovies.sort(compareByGenre);
                    scope.moviesByGenre = [];
                    var currentGroup = {name: null};
                    angular.forEach(filteredMovies, function(movie) {
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

                scope.$watch('orderSetting', function() {
                    sortByGenre();
                });

                scope.$watch('criteria', function() {
                    sortByGenre();
                }, true);
            }

            init();
        }
    };
}]);