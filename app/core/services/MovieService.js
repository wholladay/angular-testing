/* global angular */
var services = angular.module('myApp.services', ['ngRoute']);
services.service('MovieService', ['$http', '$q', function($http, $q) {
    'use strict';
    return {
        getMovies: function() {
            var deferred = $q.defer();
            var url = '/movies';
            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function(error) {
            });
            return deferred.promise;
        }
    };
}]);
