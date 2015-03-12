/* global require, console, __dirname */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var movies = JSON.parse(fs.readFileSync(__dirname + '/videos.json', 'utf8'));
var formats = JSON.parse(fs.readFileSync(__dirname + '/formats.json', 'utf8'));
var genres = JSON.parse(fs.readFileSync(__dirname + '/genres.json', 'utf8'));
var ratings = JSON.parse(fs.readFileSync(__dirname + '/ratings.json', 'utf8'));

app.use(express.static(path.join(__dirname, 'app')));
app.get('/', function(req, res) {
    'use strict';
    res.sendFile(__dirname + '/app/movies/movies.html');
});
app.get('/movies', function(req, res) {
    'use strict';
    res.send(movies);
});
app.get('/formats', function(req, res) {
    'use strict';
    res.send(formats);
});
app.get('/genres', function(req, res) {
    'use strict';
    res.send(genres);
});
app.get('/ratings', function(req, res) {
    'use strict';
    res.send(ratings);
});
server.listen(3000);
console.log('Server listening on port 3000');