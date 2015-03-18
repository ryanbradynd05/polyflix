/**
 * ConfigController
 *
 * @description :: Server-side logic for managing configs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var mdb = require('moviedb')(sails.config.themoviedb.key);

module.exports = {
  index: function(req, res) {
    mdb.configuration(function(err, response) {
      response.id = 1;
      res.send({
        configs: [response]
      });
    });
  }

};