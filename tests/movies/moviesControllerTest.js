/* global describe, beforeEach, module, it, inject, expect */
describe('movies', function() {
    'use strict';
    var $rootScope;

    beforeEach(function() {
        module('myApp');
        inject(function(_$rootScope_) {
            $rootScope = _$rootScope_;
        });
    });

    describe('movies controller', function() {

        it('should ....', inject(function($controller) {
            //spec body
            var movieCtrl = $controller('MoviesController', {$scope:$rootScope.$new()});
            expect(movieCtrl).toBeDefined();
        }));

    });
});