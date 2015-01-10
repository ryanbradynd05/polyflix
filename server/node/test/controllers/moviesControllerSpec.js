process.env.NODE_ENV = 'test';

var should = require('should'),
  request = require('supertest'),
  testSetup = require('../util/testSetup'),
  url = 'http://localhost:1337';

describe('Controllers/MoviesController', function() {
  before(function(done) {
    testSetup.before(done);
  });
  it('index - should return blank array', function(done) {
      request(url)
          .get('/movies')
          .expect(200)
          .end(function(err, res) {
              var movies = res.body;
              should.equal(movies.length,0);
              should.not.exist(err);
              if (err) { return done(err); }
              done();
          });
  });
  after(function(done) {
    testSetup.after(done);
  });
});