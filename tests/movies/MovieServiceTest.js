/* global describe, beforeEach, afterEach, module, it, inject, expect */
describe('movies', function() {
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

        it('getFormats success returns formats object.', function() {
            var formats = {'format1': 'VHS'};
            $httpBackend.expectGET('/formats').respond(formats);
            MovieService.getFormats().then(function(data) {
                expect(data).toEqual(formats);
            }, function() {
                expect(false).toBe(true);
            });
            $httpBackend.flush();
        });

        it('getFormats should return failure message.', function() {
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
});