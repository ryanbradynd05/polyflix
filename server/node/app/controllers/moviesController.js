'use strict';

var locomotive = require('locomotive'),
    Movie = require("../models/index").Movie;

var moviesController = new locomotive.Controller();

moviesController.index = function() {
    Movie.findAll()
    .success(function(movies) {
        this.res.send({movies: movies});
    }.bind(this))
    .error(function(error) {
        this.next(error);
    }.bind(this));
};

moviesController.create = function() {
    this.res.send({});
};

moviesController.show = function(movieId) {
    this.res.send({});
};

moviesController.update = function(movieId) {
    this.res.send({});
};

moviesController.destroy = function(movieId) {
    this.res.send({});
};

module.exports = moviesController;
