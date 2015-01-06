'use strict';

var locomotive = require('locomotive'),
    Controller = locomotive.Controller;

var moviesController = new Controller();

moviesController.index = function() {
    this.res.send({});
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
