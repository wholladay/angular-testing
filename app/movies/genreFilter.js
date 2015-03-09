/* global myApp */
myApp.filter('genre', function() {
    'use strict';
    return function(genres) {
        var genreStr = '';
        if (genres[0] && genres[0] !== 'None') {
            genreStr = genres[0];
            if (genres[1] && genres[1] !== 'None') {
                genreStr += ', ' + genres[1];
            }
        }
        return genreStr;
    };
});