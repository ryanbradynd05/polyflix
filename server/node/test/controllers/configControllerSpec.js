'use strict';

process.env.NODE_ENV = 'test';

var should = require('should'),
  request = require('supertest'),
  testSetup = require('../util/testSetup'),
  url = 'http://localhost:3000';

describe('Controllers/ConfigController', function() {
  before(function(done) {
    testSetup.before(done);
  });
  it('info - should return config from themoviedb', function(done) {
    request(url)
      .get('/configs')
      .expect(200)
      .end(function(err, res) {
        var queryResult = res.body;
        queryResult.should.be.an.Object; // jshint ignore:line
        queryResult.configs.should.be.an.Array; // jshint ignore:line
        should.equal(queryResult.configs.length, 1);
        should.not.exist(err);
        if (err) {
          return done(err);
        }
        done();
      });
  });
  after(function(done) {
    testSetup.after(done);
  });
});