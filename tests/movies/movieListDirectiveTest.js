/* global describe, beforeEach, afterEach, module, it, inject, expect, spyOn */
describe('movie list', function() {
    'use strict';
    var $rootScope;
    var $compile;
    var $q;
    var element;
    var MovieService;
    var movies;

    beforeEach(function() {
        module('myApp');
        module('templates');
        module(function($compileProvider) {
            $compileProvider.directive('movieItem', function() {
                return {
                    priority: 100,
                    terminal: true,
                    restrict: 'E',
                    template: '<div>movie item</div>'
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
    }

    describe('init', function() {
        it('should setup scope', function() {
            $rootScope.criteria = {};
            compileDirective();
            var scope = element.isolateScope();
            expect(scope.criteria).toBe($rootScope.criteria);
        });
    });

    describe('orderBy genre', function() {

        var orderByTemplate = '<movie-list order-by="genre" criteria="criteria"></movie-list>';
        beforeEach(function() {
            $rootScope.criteria = {};
            movies = [
                {number: 9,title: 'Fiddler on the Roof',ratingName: "G",genreName: "Musical",subGenreName: "Drama",formatName: "DVD",genre: 6,subGenre: 3},
                {number: 6,title: 'All Dogs Go to Heaven',ratingName: "G",genreName: "Animation",subGenreName: "Musical",formatName: "VHS",genre: 2,subGenre: 6},
                {number: 7, title: 'Sahara', ratingName: 'PG-13', genreName: 'Action', subGenreName: 'Comedy', formatName: 'DVD',genre: 13,subGenre: 12},
                {number: 408, title: 'Mr. Destiny', ratingName: 'PG-13', genreName: 'Drama', subGenreName: 'Fantasy', formatName: 'DVD',genre: 3,subGenre: 4},
                {number: 423,title: 'Alias Volume 1',ratingName: "TV14",genreName: "TV",subGenreName: "Action",formatName: "DVD",genre: 15,subGenre: 13},
                {number: 400,title: 'Fellowship of the Ring, The',ratingName: "PG-13",genreName: "Fantasy",subGenreName: "Adventure",formatName: "DVD",genre: 4,subGenre: 5}
            ];
        });

        it('should sort movies by genre', function() {
            compileDirective(orderByTemplate);
            var scope = element.isolateScope();
            expect(scope.criteria).toBe($rootScope.criteria);
            expect(scope.orderSetting).toBe('genre');
            // All unique genres, so genre group per movie.
            expect(scope.moviesByGenre.length).toBe(6);
            expect(scope.moviesByGenre[0].movies[0].title).toBe('Sahara');
            expect(scope.moviesByGenre[5].movies[0].title).toBe('Alias Volume 1');
        });

        it('should handle two movies with same genre/subGenre', function() {
            movies.push({number: 424,title: 'Alias Volume 2',ratingName: "TV14",genreName: "TV",subGenreName: "Action",formatName: "DVD",genre: 15,subGenre: 13});
            compileDirective(orderByTemplate);
            var scope = element.isolateScope();
            expect(scope.moviesByGenre.length).toBe(6);
            expect(scope.moviesByGenre[5].movies[0].title).toBe('Alias Volume 1');
            expect(scope.moviesByGenre[5].movies[1].title).toBe('Alias Volume 2');
        });

        it('should handle two movies with same name', function() {
            movies.push({number: 200,title: 'All Dogs Go to Heaven',ratingName: "G",genreName: "Animation",subGenreName: "Musical",formatName: "DVD",genre: 2,subGenre: 6});
            compileDirective(orderByTemplate);
            var scope = element.isolateScope();
            expect(scope.moviesByGenre.length).toBe(6);
            expect(scope.moviesByGenre[1].movies[0].title).toBe('All Dogs Go to Heaven');
            expect(scope.moviesByGenre[1].movies[1].title).toBe('All Dogs Go to Heaven');
            expect(scope.moviesByGenre[1].movies[0].number).toBe(6);
            expect(scope.moviesByGenre[1].movies[1].number).toBe(200);
        });

        it('should work when genres are same but sub genres are different', function() {
            movies.push({number: 34,title: "Kate & Leopold",rating: "PG-13",genreName: "Drama",subGenreName: "Romance","format": "VHS","genre": 3,"subGenre": 14});
            compileDirective(orderByTemplate);
            var scope = element.isolateScope();
            expect(scope.moviesByGenre.length).toBe(7);
            expect(scope.moviesByGenre[2].movies[0].title).toBe('Mr. Destiny');
            expect(scope.moviesByGenre[3].movies[0].title).toBe('Kate & Leopold');
        });

        it('should work when genres are same and first sub genre is not set', function() {
            movies[3].subGenre = 1;
            movies[3].subGenreName = 'None';
            movies.push({number: 34,title: "Kate & Leopold",rating: "PG-13",genreName: "Drama",subGenreName: "Romance","format": "VHS","genre": 3,"subGenre": 14});
            compileDirective(orderByTemplate);
            var scope = element.isolateScope();
            expect(scope.moviesByGenre.length).toBe(7);
            expect(scope.moviesByGenre[2].movies[0].title).toBe('Mr. Destiny');
            expect(scope.moviesByGenre[3].movies[0].title).toBe('Kate & Leopold');
        });

        it('should work when genres are same and second sub genre is not set', function() {
            movies.push({number: 34,title: "Kate & Leopold",rating: "PG-13",genreName: "Drama",subGenreName: "None","format": "VHS","genre": 3,"subGenre": 1});
            compileDirective(orderByTemplate);
            var scope = element.isolateScope();
            expect(scope.moviesByGenre.length).toBe(7);
            expect(scope.moviesByGenre[2].movies[0].title).toBe('Kate & Leopold');
            expect(scope.moviesByGenre[3].movies[0].title).toBe('Mr. Destiny');
        });

    });

});