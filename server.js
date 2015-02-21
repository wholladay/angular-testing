/* global require, console, __dirname */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var movies = JSON.parse(fs.readFileSync(__dirname + '/movies.json', 'utf8'));

app.use(express.static(path.join(__dirname, 'app')));
app.get('/', function(req, res) {
    'use strict';
    res.sendFile(__dirname + '/app/index.html');
});
app.get('/movies', function(req, res) {
    'use strict';
    res.send(movies);
});
server.listen(3000);
console.log('Server listening on port 3000');