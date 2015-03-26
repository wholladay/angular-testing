/* global describe, beforeEach, afterEach, module, it, inject, expect */
describe('movie item', function() {
    'use strict';
    var $compile;
    var $rootScope;
    var element;

    beforeEach(function() {
        module('myApp');
        //module('app/movies/movieItem.html');
        module('templates');

        inject(function(_$rootScope_, _$compile_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
        });
    });

    function compileDirective(template) {
        if (!template) {
            template = '<movie-item movie="movie"></movie-item>';
        }
        element = $compile(template)($rootScope);
        $rootScope.$digest();
    }

    it('should display a movie', function() {
        var title = 'Happy Gilmore';
        $rootScope.movie =  {
            number: 1,
            title: title,
            ratingName: 'PG-13',
            formatName: 'VHS',
            genreName: 'Comedy',
            subGenreName: 'Lousy'
        };
        compileDirective();
        var movieNumber = element.find('span')[0].innerHTML;
        expect(movieNumber).toBe('1');
        var movieInfo = element.find('p')[0].innerHTML;
        expect(movieInfo).toContain('Lousy');
    });
});