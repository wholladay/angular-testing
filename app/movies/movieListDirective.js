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
                    var criteria = scope.criteria;
                    if (!titleMatch(item)) {
                        return false;
                    } else if (!genreMatch(item)) {
                        return false;
                    } else if (scope.criteria.rating && scope.criteria.rating !== 'Any' && item.ratingName !== scope.criteria.rating) {
                        return false;
                    } else if (scope.criteria.format && scope.criteria.format !== 'Any' && item.formatName !== scope.criteria.format) {
                        return false;
                    }

                    return true;
                };
            };

            function titleMatch(item) {
                if (scope.criteria.title) {
                    var titleRegExp = new RegExp(scope.criteria.title, 'i');
                    return item.title.match(titleRegExp);
                }
                return true;
            }

            function genreMatch(item) {
                if (scope.criteria.genre) {
                    var genreRegEx = new RegExp(scope.criteria.genre, 'i');
                    return (item.genreName.match(genreRegEx) || item.subGenreName.match(genreRegEx));
                }
                return true;
            }

            function compareByGenre(movie1, movie2) {
                var result = movie1.genreName.localeCompare(movie2.genreName);
                if (!result) {
                    // Genres are the same, so we need to look at sub genres...
                    result = movie1.subGenreName.localeCompare(movie2.subGenreName);
                    if (!result) {
                        result = movie1.title.localeCompare(movie2.title);
                        if (!result) {
                            return movie1.number - movie2.number;
                        }
                        return result;
                    }
                    // Sub genres are different so we check to see if movie1 has no sub genre.
                    if (movie1.subGenre === 1) {
                        return -1;
                    }
                    // Now see if movie2 has a sub genre of "None"
                    if (movie2.subGenre === 1) {
                        return 1;
                    }
                    return result;
                }
                return result;
            }

            function sortByGenre() {
                if (scope.movies.length > 0 && scope.orderSetting === 'genre') {
                    // First, filter the list of movies.
                    var filteredMovies = $filter('filter')(scope.movies, scope.criteriaMatch());
                    // Second, sort the filtered movies by genre.
                    filteredMovies.sort(compareByGenre);
                    // Finally, divide the list into genre groups so that a heading can be displayed for each genre.
                    scope.moviesByGenre = [];
                    var currentGroup = {genres: ['', '']};
                    angular.forEach(filteredMovies, function(movie) {
                        if (movie.genreName !== currentGroup.genres[0] || movie.subGenreName !== currentGroup.genres[1]) {
                            currentGroup = {genres: [movie.genreName, movie.subGenreName, ' - '], movies: [movie]};
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