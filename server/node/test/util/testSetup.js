'use strict';

var Sails = require('sails').constructor;

module.exports = {
  before: function(done) {
    new Sails().lift({
      hooks: {
        grunt: false
      },
      port: 1337,
      connections: {
        mysql: {
          host: 'localhost',
          database: 'polyflix-node-test'
        }
      },
      models: {
        migrate: "drop"
      }
    }, function(err, sails) {
      this.app = sails;
      done();
    }.bind(this));
  },
  after: function(done) {
    this.app.lower(done);
  }
};