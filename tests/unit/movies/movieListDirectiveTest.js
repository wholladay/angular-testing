/* global describe, beforeEach, afterEach, module, it, inject, expect, spyOn */
describe('movie list', function() {
    'use strict';
    var $rootScope;
    var $compile;
    var $q;
    var element;
    var MovieService;
    var movies;
    var scope;

    beforeEach(function() {
        module('myApp');
        module('templates');
        module(function($compileProvider) {
            $compileProvider.directive('movieItem', function() {
                return {
                    priority: 100,
                    terminal: true,
                    restrict: 'E',
                    scope: {
                        movie: '='
                    },
                    templateUrl: 'movies/movieItem.html',
                    link: function(scope) {
                    }
                };
            });
        });

        inject(function(_$rootScope_, _$compile_, _$q_, _MovieService_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $q = _$q_;
            MovieService = _MovieService_;
            spyOn(MovieService, 'getJoinedMovies').andCallFake(mockGetJoinedMovies);
        });

        movies = [{number: 1, title: 'All Dogs go to Heaven', ratingName: 'G', formatName: 'VHS', genreName: ''}];
    });

    function mockGetJoinedMovies() {
        var deferred = $q.defer();
        deferred.resolve(movies);
        return deferred.promise;
    }

    function compileDirective(template) {
        if (!template) {
            template = '<movie-list order-by="title" criteria="criteria"></movie-list>';
        }
        element = $compile(template)($rootScope.$new());
        $rootScope.$digest();
        scope = element.isolateScope();
    }

    describe('init', function() {
        it('should setup scope', function() {
            $rootScope.criteria = {};
            compileDirective();
            expect(scope.criteria).toBe($rootScope.criteria);
        });
    });

    describe('orderBy title', function() {
        var orderByTemplate = '<movie-list order-by="title" criteria="criteria"></movie-list>';
        beforeEach(function() {
            $rootScope.criteria = {};
            movies = [
                { number: 23, title: "Hunger Games, The", rating: 4, genre: 21, subGenre: 3, format: 2, ratingName: "PG-13", genreName: "Sci-Fi", subGenreName: "Drama", formatName: "DVD" },
                { number: 38, title: "Galaxy Quest", rating: 3, ratingName: "PG", genre: 12, subGenre: 4, genreName: "Comedy", subGenreName: "Fantasy", format: 1, formatName: "VHS" }
            ];
        });

        it('should order movies by title', function() {
            compileDirective(orderByTemplate);
            expect(scope.movies.length).toBe(2);
            //expect(scope.movies[0].title).toBe('Galaxy Quest');
            //expect(scope.movies[1].title).toBe('Hunger Games, The');
            var movieTitles = element.find('h3');
            expect(movieTitles.length).toBe(2);
            expect(movieTitles[0].innerHTML).toContain('Galaxy Quest');
            expect(movieTitles[1].innerHTML).toContain('Hunger Games');
        });

        it('should only choose specified title matches', function() {
            $rootScope.criteria.title = 'gal';
            compileDirective(orderByTemplate);
            expect(scope.movies.length).toBe(2);
            var movieTitles = element.find('h3');
            expect(movieTitles.length).toBe(1);
            expect(movieTitles[0].innerHTML).toContain('Galaxy Quest');
        });

        it('should only choose specified genre matches', function() {
            $rootScope.criteria.genre = 'comedy';
            compileDirective(orderByTemplate);
            expect(scope.movies.length).toBe(2);
            var movieTitles = element.find('h3');
            expect(movieTitles.length).toBe(1);
            expect(movieTitles[0].innerHTML).toContain('Galaxy Quest');
        });
    });

    describe('orderBy number', function() {
        var orderByTemplate = '<movie-list order-by="number" criteria="criteria"></movie-list>';

        beforeEach(function() {
            $rootScope.criteria = {};
            movies = [
                { number: 23, title: "Hunger Games, The", rating: 4, genre: 21, subGenre: 3, format: 2, ratingName: "PG-13", genreName: "Sci-Fi", subGenreName: "Drama", formatName: "DVD" },
                { number: 38, title: "Galaxy Quest", rating: 3, ratingName: "PG", genre: 12, subGenre: 4, genreName: "Comedy", subGenreName: "Fantasy", format: 1, formatName: "VHS" }
            ];
        });

        it('should order by number', function() {
            compileDirective(orderByTemplate);
            expect(scope.movies.length).toBe(2);
            var movieTitles = element.find('h3');
            expect(movieTitles.length).toBe(2);
            expect(movieTitles[0].innerHTML).toContain('Hunger');
        });

        it('should only keep matching rating criteria', function() {
            $rootScope.criteria.rating = 'PG';
            compileDirective(orderByTemplate);
            expect(scope.movies.length).toBe(2);
            var movieTitles = element.find('h3');
            expect(movieTitles.length).toBe(1);
            expect(movieTitles[0].innerHTML).toContain('Galaxy');
        });

        it('should only keep matching format criteria', function() {
            $rootScope.criteria.format = 'DVD';
            compileDirective(orderByTemplate);
            expect(scope.movies.length).toBe(2);
            var movieTitles = element.find('h3');
            expect(movieTitles.length).toBe(1);
            expect(movieTitles[0].innerHTML).toContain('Hunger');
        });
    });

    describe('orderBy genre', function() {

        var orderByTemplate = '<movie-list order-by="genre" criteria="criteria"></movie-list>';
        beforeEach(function() {
            $rootScope.criteria = {};
            movies = [
                { number: 9, title: 'Fiddler on the Roof', ratingName: "G", genreName: "Musical", subGenreName: "Drama", formatName: "DVD", genre: 6, subGenre: 3 },
                { number: 6, title: 'All Dogs Go to Heaven', ratingName: "G", genreName: "Animation", subGenreName: "Musical", formatName: "VHS", genre: 2, subGenre: 6 },
                { number: 7, title: 'Sahara', ratingName: 'PG-13', genreName: 'Action', subGenreName: 'Comedy', formatName: 'DVD', genre: 13, subGenre: 12 },
                { number: 408, title: 'Mr. Destiny', ratingName: 'PG-13', genreName: 'Drama', subGenreName: 'Fantasy', formatName: 'DVD', genre: 3, subGenre: 4 },
                { number: 423, title: 'Alias Volume 1', ratingName: "TV14", genreName: "TV", subGenreName: "Action", formatName: "DVD", genre: 15, subGenre: 13 },
                { number: 400, title: 'Fellowship of the Ring, The', ratingName: "PG-13", genreName: "Fantasy", subGenreName: "Adventure", formatName: "DVD", genre: 4, subGenre: 5 }
            ];
        });

        it('should sort movies by genre', function() {
            compileDirective(orderByTemplate);
            expect(scope.criteria).toBe($rootScope.criteria);
            expect(scope.orderSetting).toBe('genre');
            // All unique genres, so genre group per movie.
            expect(scope.moviesByGenre.length).toBe(6);
            expect(scope.moviesByGenre[0].movies[0].title).toBe('Sahara');
            expect(scope.moviesByGenre[5].movies[0].title).toBe('Alias Volume 1');
        });

        it('should handle two movies with same genre/subGenre', function() {
            movies.push({ number: 424, title: 'Alias Volume 2', ratingName: "TV14", genreName: "TV", subGenreName: "Action", formatName: "DVD", genre: 15, subGenre: 13 });
            compileDirective(orderByTemplate);
            expect(scope.moviesByGenre.length).toBe(6);
            expect(scope.moviesByGenre[5].movies[0].title).toBe('Alias Volume 1');
            expect(scope.moviesByGenre[5].movies[1].title).toBe('Alias Volume 2');
        });

        it('should handle two movies with same name', function() {
            movies.push({ number: 200, title: 'All Dogs Go to Heaven', ratingName: "G", genreName: "Animation", subGenreName: "Musical", formatName: "DVD", genre: 2, subGenre: 6 });
            compileDirective(orderByTemplate);
            expect(scope.moviesByGenre.length).toBe(6);
            expect(scope.moviesByGenre[1].movies[0].title).toBe('All Dogs Go to Heaven');
            expect(scope.moviesByGenre[1].movies[1].title).toBe('All Dogs Go to Heaven');
            expect(scope.moviesByGenre[1].movies[0].number).toBe(6);
            expect(scope.moviesByGenre[1].movies[1].number).toBe(200);
        });

        it('should work when genres are same but sub genres are different', function() {
            movies.push({ number: 34, title: "Kate & Leopold", rating: "PG-13", genreName: "Drama", subGenreName: "Romance", formatName: "VHS", genre: 3, subGenre: 14 });
            compileDirective(orderByTemplate);
            expect(scope.moviesByGenre.length).toBe(7);
            expect(scope.moviesByGenre[2].movies[0].title).toBe('Mr. Destiny');
            expect(scope.moviesByGenre[3].movies[0].title).toBe('Kate & Leopold');
        });

        it('should work when genres are same and first sub genre is not set', function() {
            movies[3].subGenre = 1;
            movies[3].subGenreName = 'None';
            movies.push({ number: 34, title: "Kate & Leopold", rating: "PG-13", genreName: "Drama", subGenreName: "Romance", formatName: "VHS", genre: 3, subGenre: 14 });
            compileDirective(orderByTemplate);
            expect(scope.moviesByGenre.length).toBe(7);
            expect(scope.moviesByGenre[2].movies[0].title).toBe('Mr. Destiny');
            expect(scope.moviesByGenre[3].movies[0].title).toBe('Kate & Leopold');
        });

        it('should work when genres are same and second sub genre is not set', function() {
            movies.push({ number: 34, title: "Kate & Leopold", rating: "PG-13", genreName: "Drama", subGenreName: "None", formatName: "VHS", genre: 3, subGenre: 1 });
            compileDirective(orderByTemplate);
            expect(scope.moviesByGenre.length).toBe(7);
            expect(scope.moviesByGenre[2].movies[0].title).toBe('Kate & Leopold');
            expect(scope.moviesByGenre[3].movies[0].title).toBe('Mr. Destiny');
        });

    });

});