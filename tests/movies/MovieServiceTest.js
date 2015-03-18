/* global describe, beforeEach, afterEach, module, it, inject, expect */
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
            var rawGenres = [{genreID: 1, genreName: 'Action'},{genreID: 2, genreName: 'Western'}];
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
            var rawRatings = [{ratingID: 1, ratingName: 'G'},{ratingID: 2, ratingName: 'PG'}];
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
            var movies =  [
                {"number": 1,"title": "101 Dalmations","rating": 2,"genre": 2,"subGenre": 5,"format": 1,"status": 2},
                {"number": 2,"title": "Adventures of Pinochio, The","rating": 2,"genre": 4,"subGenre": 2,"format": 1,"status": 2}
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
});