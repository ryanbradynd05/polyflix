'use strict';

var locomotive = require('locomotive'),
    Movie = require("../models/index").Movie;

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

    Movie.build(params)
        .success(function(movie) {
            this.res.send({
                movie: movie
            });
        }.bind(this))
        .error(function(error) {
            this.next(error);
        }.bind(this));
};

moviesController.show = function(movieId) {
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

moviesController.update = function(movieId) {
    var params = this.req.body;

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

moviesController.destroy = function(movieId) {
    Movie.find(movieId)
        .success(function(movie) {
            movie.destroy()
                .success(function(result) {
                    this.res.send({});
                }.bind(this))
                .error(function(error) {
                    this.next(error);
                }.bind(this));
        }.bind(this))
        .error(function(error) {
            this.next(error);
        }.bind(this));
};

module.exports = moviesController;