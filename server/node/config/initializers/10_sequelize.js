'use strict';

var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    Sequelize = require("sequelize");

// setup sequelize
module.exports = function(done) {
  // store reference to sequelize in app instance
  this.sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: '../../database/node.db',
    logging: this.env == 'development' ? console.log : false
  });

  // find models and load them
  var modelsdir = __dirname + '/../../app/models',
      _this = this;

  async.forEachSeries(fs.readdirSync(modelsdir).sort(), function(file, next) {
    /* match .js files only (for now) */
    if (/\.js$/.test(file)) {
      // let Sequelize import model
      var model = _this.sequelize.import(path.join(modelsdir, file));

      // register model
      console.log('Register model:',model.name);
      _this[model.name] = model;

      // sync model (creates tables if they don't yet exist)
      model.sync()
        .success(function() {
          next();
        })
        .error(function(error) {
          next(error);
        });
    } else
      next();
  }, function() {
    done();
  });
};