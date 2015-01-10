'use strict';

var locomotive = require('locomotive'),
    Movie = require('../models/index').Movie,
    Dao = require('../util/dao');

var moviesController = new locomotive.Controller(),
    dao = new Dao(Movie);

moviesController.index = function() {
    dao.findAll(this,'movies');
};

moviesController.create = function() {
    var params = this.req.body;
    dao.create(this,'movie',params);
};

moviesController.show = function() {
    var movieId = this.req.params.id;
    dao.show(this,'movie',movieId);
};

moviesController.update = function() {
    var params = this.req.body,
        movieId = this.req.params.id;
    dao.update(this,'movie',movieId,params);
};

moviesController.destroy = function() {
    var movieId = this.req.params.id;
    dao.destroy(this,'movie',movieId);
};

moviesController.deleteAll = function() {
    dao.deleteAll(this);
};

module.exports = moviesController;