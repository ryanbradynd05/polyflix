'use strict';

var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    environemnt = this.env || 'development',
    config = require(process.env.PWD + '/config/config.json')[environemnt];

module.exports = function(done) {
    console.log('config',config);
    var sequelize = new Sequelize(null, null, null, {
        dialect: config.dialect,
        storage: process.env.PWD + config.storage,
        logging: environemnt === 'development' ? console.log : false
    });

    var migrator = sequelize.getMigrator({
        path: 'migrations',
        filesFilter: /\.js$/
    });

    console.log('Start sequelize migrations');
    migrator.migrate({
            method: 'up'
        })
        .then(function() {
            console.log('Sequelize migrations complete');
            done();
        });
};