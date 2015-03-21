/* global describe, beforeEach, afterEach, module, it, inject, expect */
describe('movies controller', function() {
    'use strict';
    var $rootScope;
    var $controller;
    var $q;
    var $timeout;
    var $httpBackend;
    var MovieService;

    beforeEach(function() {
        module('myApp');
        module(function($provide) {
            // Mock the MovieService
            $provide.service('MovieService', function() {
                return {
                    getRatings: function() {
                        var deferred = $q.defer();

                        function Rating(first, second) {
                            this.rating1 = first;
                            this.rating2 = second;
                        }

                        var ratings = new Rating('G', 'PG');
                        Rating.prototype.whatever = 'hello';
                        deferred.resolve(ratings);
                        return deferred.promise;
                    },
                    getFormats: function() {
                        function Format(one, two) {
                            this.format1 = one;
                            this.format2 = two;
                        }

                        var deferred = $q.defer();
                        var formats = new Format('VHS', 'DVD');
                        Format.prototype.super = 'uber';
                        deferred.resolve(formats);
                        return deferred.promise;
                    }
                };
            });
        });
        inject(function(_$rootScope_, _$controller_, _$q_, _$timeout_, _$httpBackend_, _MovieService_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $q = _$q_;
            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
            MovieService = _MovieService_;
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('setup', function() {

        it('should initialize using spyOn', function() {
            var deferred = $q.defer();
            deferred.resolve({format1: 'VHS', format2: 'DVD'});
            spyOn(MovieService, 'getFormats').andReturn(deferred.promise);
            var movieCtrl = $controller('MoviesController');
            $timeout.flush();
            expect(movieCtrl).toBeDefined();
            expect(MovieService.getFormats).toHaveBeenCalled();
        });

        it('should initialize', function() {
            //spec body
            var movieCtrl = $controller('MoviesController');
            // $timeout.flush() is required to get the promise.resolve() methods to fire.
            $timeout.flush();
            expect(movieCtrl).toBeDefined();
            expect(movieCtrl.ratings.length).toBe(3);
            expect(movieCtrl.formats.length).toBe(3);
            expect(movieCtrl.formats[0]).toEqual('Any');
        });

        it('toggleMenu', function() {
            var movieCtrl = $controller('MoviesController');
            $timeout.flush();
            expect(movieCtrl).toBeDefined();
            movieCtrl.toggleMenu();
        });

    });

});