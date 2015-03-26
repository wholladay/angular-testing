/* global module */
module.exports = function(config) {
    'use strict';
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-aria/angular-aria.js',
            'app/bower_components/angular-loader/angular-loader.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/app.js',
            'app/movies/**/*.js',
            'tests/unit/**/*.js',
            'app/movies/**/*.html'
        ],

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/components/**/*.js': ['coverage'],
            'app/core/**/*.js': ['coverage'],
            'app/movies/**/*.js': ['coverage'],
            // Convert html files to js so Karma will serve them up.
            'app/movies/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'templates',
            stripPrefix: 'app/'
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'tests/coverage/'
        },

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};