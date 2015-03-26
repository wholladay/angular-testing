/* https://github.com/angular/protractor/blob/master/docs/toc.md */
/* global describe, browser, it, expect, beforeEach, element, by */
describe('movies', function() {
    'use strict';

    beforeEach(function() {
        browser.get('/');
    });

    function getMovies() {
        return element.all(by.repeater('movie in movies'));
    }

    describe('default list', function() {

        it('should list all movies', function() {
            expect(browser.getTitle()).toEqual('My AngularJS App');
            expect(getMovies().count()).toBe(429);
        });
    });

    describe('order by', function() {

        it('should render all movies sorted by number', function() {
            expect(browser.getTitle()).toEqual('My AngularJS App');
            var orderBy = element(by.model('mc.orderBy'));
            expect(orderBy).toBeDefined();
            orderBy.click();
            var numberOption = element(by.id('select_option_00D'));
            expect(numberOption).toBeDefined();
            numberOption.click();

            var movies = getMovies();
            expect(movies.count()).toBe(429);
            movies.first().getText().then(function(data) {
                expect(data.indexOf('1')).toBe(0);
            });
            movies.last().getText().then(function(data) {
                expect(data.indexOf('429')).toBe(0);
            });
        });

        it('should render all movies sorted by title', function() {
            expect(browser.getTitle()).toEqual('My AngularJS App');
            var orderBy = element(by.model('mc.orderBy'));
            expect(orderBy).toBeDefined();
            orderBy.click();
            var titleOption = element(by.id('select_option_00C'));
            expect(titleOption).toBeDefined();
            titleOption.click();

            var movies = getMovies();
            expect(movies.count()).toBe(429);
            movies.first().getText().then(function(data) {
                expect(data.indexOf('101 Dalmatians')).toBeGreaterThan(0);
            });
            movies.last().getText().then(function(data) {
                expect(data.indexOf('Yours, Mine & Ours')).toBeGreaterThan(0);
            });
        });
    });

    describe('criteria', function() {

        it('should filter by title', function() {
            var titleInput = element(by.model('mc.criteria.title'));
            expect(titleInput).toBeDefined();
            titleInput.sendKeys('hunger');
            expect(getMovies().count()).toBe(1);
        });

        it('should filter by genre', function() {
            var genreInput = element(by.model('mc.criteria.genre'));
            expect(genreInput).toBeDefined();
            genreInput.sendKeys('western');
            expect(getMovies().count()).toBe(7);
        });
    });

});