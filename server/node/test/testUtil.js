'use strict';

var locomotive = require('locomotive'),
    bootable = require('bootable'),
    supertest = require('supertest'),
    should = require('should');

module.exports = {
    before: function() {
        var env = {};
        process.once('serverListening', function() {
            done();
        });
        process.env.NODE_ENV = 'test';
        console.log(process.env.NODE_ENV,process.env.PWD);
        var app = new locomotive.Application();
        app.phase(locomotive.boot.controllers(process.env.PWD + '/app/controllers'));
        app.phase(locomotive.boot.views());
        app.phase(require('bootable-environment')(process.env.PWD + '/config/environments'));
        app.phase(bootable.initializers(process.env.PWD + '/config/initializers'));
        app.phase(locomotive.boot.routes(process.env.PWD + '/config/routes'));
        app.phase(locomotive.boot.httpServer(3000, '0.0.0.0'));
        app.boot(function(err) {
            if (err) {
                console.error(err.message);
                console.error(err.stack);
                return process.exit(-1);
            }
        });
        env.app = app;
        env.server = supertest.agent(env.app.express);
        return env;
    },
    after: function(env) {
        if (env.server) {
            process.once('serverClosed', function() {
                env.app = undefined;
                env.server = undefined;
                done();
            });
            process.emit('closeServer');
        }
    },
    checkAttribute: function(model, name, type) {
        var attribute = model.attributes[name];
        should.exist(attribute);
        should.equal(attribute.type._typeName,type);
    }
};