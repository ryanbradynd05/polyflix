'use strict';

var locomotive = require('locomotive'),
    Movie = require('../models/index').Movie;

var moviesController = new locomotive.Controller();

moviesController.index = function() {
    Movie.findAll()
        .success(function(movies) {
            this.res.send({
                movies: movies
            });
        }.bind(this))
        .error(function(error) {
            this.next(error);
        }.bind(this));
};

moviesController.create = function() {
    var params = this.req.body;

    Movie.create(params)
        .success(function(movie) {
            this.res.send({
                movie: movie
            });
        }.bind(this))
        .error(function(error) {
            this.next(error);
        }.bind(this));
};

moviesController.show = function() {
    var movieId = this.req.params.id;

    Movie.find(movieId)
        .success(function(movie) {
            this.res.send({
                movie: movie
            });
        }.bind(this))
        .error(function(error) {
            this.next(error);
        }.bind(this));
};

moviesController.update = function() {
    var params = this.req.body,
        movieId = this.req.params.id;

    Movie.find(movieId)
        .success(function(movie) {
            movie.updateAttributes(params)
                .success(function() {
                    this.res.send({
                        movie: movie
                    });
                }.bind(this))
                .error(function(error) {
                    this.next(error);
                }.bind(this));
        }.bind(this))
        .error(function(error) {
            this.next(error);
        }.bind(this));
};

moviesController.destroy = function() {
    var movieId = this.req.params.id;

    Movie.find(movieId)
        .success(function(movie) {
            movie.destroy()
                .success(function(result) {
                    this.res.send({
                        movie: {}
                    });
                }.bind(this))
                .error(function(error) {
                    this.next(error);
                }.bind(this));
        }.bind(this))
        .error(function(error) {
            this.next(error);
        }.bind(this));
};

moviesController.deleteAll = function() {
    if (process.env.NODE_ENV === 'test') {
        Movie.destroy();
    }
    this.res.send({});
};

module.exports = moviesController;