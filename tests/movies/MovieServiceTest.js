/* global describe, beforeEach, afterEach, module, it, inject, expect, spyOn */
describe('MovieService', function() {
    'use strict';
    var $httpBackend;
    var MovieService;

    beforeEach(function() {
        module('myApp');
        inject(function(_$httpBackend_, _MovieService_) {
            $httpBackend = _$httpBackend_;
            MovieService = _MovieService_;
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getFormats', function() {

        it('success returns formats object.', function() {
            var rawFormats = [{formatID: 1, formatName: 'VHS'}];
            var formats = {format1: 'VHS'};
            $httpBackend.expectGET('/formats').respond(rawFormats);
            MovieService.getFormats().then(function(data) {
                expect(data).toEqual(formats);
            }, function() {
                expect(false).toBe(true);
            });
            $httpBackend.flush();
        });

        it('should return failure message.', function() {
            var errMsg = 'ERROR!';
            $httpBackend.expectGET('/formats').respond(500, errMsg);
            MovieService.getFormats().then(function() {
                expect(false).toBe(true);
            }, function(err) {
                expect(err).toEqual(errMsg);
            });
            $httpBackend.flush();
        });
    });

    describe('getGenres', function() {

        it('success returns genres object.', function() {
            var rawGenres = [{genreID: 1, genreName: 'Action'}, {genreID: 2, genreName: 'Western'}];
            var genres = {genre1: 'Action', genre2: 'Western'};
            $httpBackend.expectGET('/genres').respond(rawGenres);
            MovieService.getGenres().then(function(data) {
                expect(data).toEqual(genres);
            }, function() {
                expect(false).toBe(true);
            });
            $httpBackend.flush();
        });

        it('should return failure message.', function() {
            var errMsg = 'ERROR!';
            $httpBackend.expectGET('/genres').respond(503, errMsg);
            MovieService.getGenres().then(function() {
                expect(false).toBe(true);
            }, function(err) {
                expect(err).toEqual(errMsg);
            });
            $httpBackend.flush();
        });
    });

    describe('getRatings', function() {

        it('success returns ratings object.', function() {
            var rawRatings = [{ratingID: 1, ratingName: 'G'}, {ratingID: 2, ratingName: 'PG'}];
            var genres = {rating1: 'G', rating2: 'PG'};
            $httpBackend.expectGET('/ratings').respond(rawRatings);
            MovieService.getRatings().then(function(data) {
                expect(data).toEqual(genres);
            }, function() {
                expect(false).toBe(true);
            });
            $httpBackend.flush();
        });

        it('should return failure message.', function() {
            var errMsg = 'ERROR!';
            $httpBackend.expectGET('/ratings').respond(503, errMsg);
            MovieService.getRatings().then(function() {
                expect(false).toBe(true);
            }, function(err) {
                expect(err).toEqual(errMsg);
            });
            $httpBackend.flush();
        });
    });

    describe('getMovies', function() {

        it('success returns movies array.', function() {
            var movies = [
                {
                    "number": 1,
                    "title": "101 Dalmations",
                    "rating": 2,
                    "genre": 2,
                    "subGenre": 5,
                    "format": 1,
                    "status": 2
                },
                {
                    "number": 2,
                    "title": "Adventures of Pinochio, The",
                    "rating": 2,
                    "genre": 4,
                    "subGenre": 2,
                    "format": 1,
                    "status": 2
                }
            ];
            $httpBackend.expectGET('/movies').respond(movies);
            MovieService.getMovies().then(function(data) {
                expect(data).toEqual(movies);
            }, function() {
                expect(false).toBe(true);
            });
            $httpBackend.flush();
        });

        it('should return failure message.', function() {
            var errMsg = 'ERROR!';
            $httpBackend.expectGET('/movies').respond(503, errMsg);
            MovieService.getMovies().then(function() {
                expect(false).toBe(true);
            }, function(err) {
                expect(err).toEqual(errMsg);
            });
            $httpBackend.flush();
        });
    });

    describe('getJoinedMovies', function() {
        var $q;
        var ratings = {};
        var genres = {};
        var formats = {};
        var movies = [];

        function getRatings() {
            var deferred = $q.defer();
            deferred.resolve(ratings);
            return deferred.promise;
        }

        function getGenres() {
            var deferred = $q.defer();
            deferred.resolve(genres);
            return deferred.promise;
        }

        function getFormats() {
            var deferred = $q.defer();
            deferred.resolve(formats);
            return deferred.promise;
        }

        function getMovies() {
            var deferred = $q.defer();
            deferred.resolve(movies);
            return deferred.promise;
        }

        function rejectRequest() {
            var deferred = $q.defer();
            deferred.reject('ERROR');
            return deferred.promise;
        }

        beforeEach(function() {
            ratings = { rating1: "NR", rating2: "G", rating3: "PG", rating4: "PG-13", rating5: "R", rating6: "TV14" };
            genres = { genre1: "None", genre2: "Animation", genre3: "Drama", genre4: "Fantasy", genre5: "Adventure", genre6: "Musical", genre7: "Christmas", genre8: "Western", genre9: "Educational", genre10: "Workout", genre11: "Religious", genre12: "Comedy", genre13: "Action", genre14: "Romance", genre15: "TV", genre16: "Crime", genre17: "Documentary", genre18: "Family", genre19: "Horror", genre20: "Mystery", genre21: "Sci-Fi", genre22: "Short", genre23: "Thriller", genre24: "War" };
            formats = { format1: 'VHS', format2: 'DVD', format3: 'Blu-ray' };
            movies = [
                { "number": 18, "title": "Chitty Chitty Bang Band", "rating": 2, "genre": 4, "subGenre": 6, "format": 1, "status": 2 },
                { "number": 19, "title": "Christmas Carol, A", "rating": 3, "genre": 4, "subGenre": 7, "format": 1, "status": 2 },
                {"number": 20, "title": "Christy", "rating": 1, "genre": 3, "subGenre": 1, "format": 1, "status": 2},
                { "number": 21, "title": "Cinderella", "rating": 2, "genre": 2, "subGenre": 18, "format": 2, "status": 2 },
                { "number": 22, "title": "Racing Stripes", "rating": 3, "genre": 18, "subGenre": 4, "format": 2, "status": 2 },
                { "number": 23, "title": "Hunger Games, The", "rating": 4, "genre": 21, "subGenre": 3, "format": 2, "status": 2 },
                { "number": 24, "title": "Doctor Dolittle", "rating": 2, "genre": 4, "subGenre": 6, "format": 1, "status": 2 },
                {"number": 25, "title": "Dumbo", "rating": 2, "genre": 2, "subGenre": 1, "format": 1, "status": 2},
                { "number": 26, "title": "Star Wars V (The Empire Strikes Back)", "rating": 3, "genre": 13, "subGenre": 5, "format": 1, "status": 2 },
                { "number": 27, "title": "42 The Jackie Robinson Story", "rating": 4, "genre": 3, "subGenre": 1, "format": 3, "status": 2 },
                { "number": 28, "title": "Extremely Goofy Movie, An", "rating": 2, "genre": 2, "subGenre": 1, "format": 1, "status": 2 }
            ];

            inject(function(_$q_) {
                $q = _$q_;
            });

        });

        it('should joined movies', function() {
            spyOn(MovieService, 'getRatings').andCallFake(getRatings);
            spyOn(MovieService, 'getGenres').andCallFake(getGenres);
            spyOn(MovieService, 'getFormats').andCallFake(getFormats);
            spyOn(MovieService, 'getMovies').andCallFake(getMovies);
            MovieService.getJoinedMovies().then(function(data) {
                expect(movies.length).toBe(11);
                expect(movies[0].ratingName).toBe('G');
                expect(movies[1].genreName).toBe('Fantasy');
                expect(movies[2].subGenreName).toBe('None');
                expect(movies[3].formatName).toBe('DVD');
                expect(movies[5].ratingName).toBe('PG-13');
            }, function(err) {
                throw 'Unexpected error returned when getting joined movies';
            });
        });

        it('should handle error when getting genres', function() {
            spyOn(MovieService, 'getRatings').andCallFake(getRatings);
            spyOn(MovieService, 'getFormats').andCallFake(getFormats);
            spyOn(MovieService, 'getMovies').andCallFake(getMovies);
            spyOn(MovieService, 'getGenres').andCallFake(rejectRequest);
            MovieService.getJoinedMovies().then(function(data) {
                throw 'Success when error was expected.';
            },function(err) {
                expect(err).toBe('ERROR');
            });
        });

    });
});