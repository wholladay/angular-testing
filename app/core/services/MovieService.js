/* global angular */
var services = angular.module('myApp.services', []);
services.service('MovieService', ['$http', '$q', function($http, $q) {
    'use strict';
    return {
        getMovies: function() {
            var deferred = $q.defer();
            var url = '/movies';
            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getRatings: function() {
            var deferred = $q.defer();
            var url = '/ratings';
            $http.get(url).success(function(ratings) {
                deferred.resolve(ratings);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getGenres: function() {
            var deferred = $q.defer();
            var url = '/genres';
            $http.get(url).success(function(genres) {
                deferred.resolve(genres);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getFormats: function() {
            var deferred = $q.defer();
            var url = '/formats';
            $http.get(url).success(function(formats) {
                deferred.resolve(formats);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
}]);