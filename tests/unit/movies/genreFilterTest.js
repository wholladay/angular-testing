/* global describe, beforeEach, afterEach, module, it, inject, expect */
describe('genre filter', function() {
    'use strict';
    var $filter;

    beforeEach(function() {
        module('myApp');
        inject(function(_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should handle no genres', function() {
        var results = $filter('genre')([]);
        expect(results).toEqual('');
    });

    it('should return blank if genre is "None"', function() {
        var results = $filter('genre')(['None']);
        expect(results).toEqual('');
    });

    it('should return just genre is no sub genre', function() {
        var results = $filter('genre')(['Action']);
        expect(results).toEqual('Action');
    });

    it('should return both genres separated by comma', function() {
        var results = $filter('genre')(['Western', 'Action']);
        expect(results).toEqual('Western, Action');
    });

});