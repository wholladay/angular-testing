/* global describe, beforeEach, afterEach, module, it, inject, expect */
describe('movies controller', function() {
    'use strict';
    var $rootScope;
    var $controller;
    var $q;
    var $timeout;
    var $httpBackend;

    beforeEach(function() {
        module('myApp');
        module(function($provide) {
            // Mock the MovieService
            $provide.service('MovieService', function() {
                return {
                    getRatings: function() {
                        var deferred = $q.defer();
                        function rating(first, second) {
                            this.rating1 = first;
                            this.rating2 = second;
                        }
                        var ratings = new rating('G', 'PG');
                        rating.prototype.whatever = 'hello';
                        deferred.resolve(ratings);
                        return deferred.promise;
                    },
                    getFormats: function() {
                        function format(one, two) {
                            this.format1 = one;
                            this.format2 = two;
                        }
                        var deferred = $q.defer();
                        var formats = new format('VHS', 'DVD');
                        format.prototype.super = 'uber';
                        deferred.resolve(formats);
                        return deferred.promise;
                    }
                };
            });
        });
        inject(function(_$rootScope_, _$controller_, _$q_, _$timeout_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $q = _$q_;
            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('setup', function() {

        it('should initialize', function() {
            //spec body
            var movieCtrl = $controller('MoviesController');
            //var movieCtrl = $controller('MoviesController', {$scope: $rootScope.$new()});
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