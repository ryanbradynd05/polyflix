'use strict';

var fs = require('fs'),
    path = require('path'),
    Sequelize = require("sequelize"),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config.json')[env];

module.exports = function(done) {

    var sequelize = new Sequelize(null, null, null, {
        dialect: config.dialect,
        storage: '../../' + config.storage,
        logging: env === 'development' ? console.log : false
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