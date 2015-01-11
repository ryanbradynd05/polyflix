'use strict';

/* global sails */

/**
 * MovieController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 var mdb = require('moviedb')(sails.config.themoviedb.key);

module.exports = {
	search: function (req, res) {
    var name = req.params.id;
    mdb.searchMovie({query: name}, function(err, response){
          res.send(response);
        });
  },
  info: function(req, res) {
    var moviedbid = req.params.id;
    mdb.movieInfo({id: moviedbid}, function(err, response){
          res.send(response);
        });
  }
};

