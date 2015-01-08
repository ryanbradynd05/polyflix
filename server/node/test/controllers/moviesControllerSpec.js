process.env.NODE_ENV = 'test';

var should = require('should'),
    request = require('supertest'),
    url = 'http://localhost:3000';
describe('Controllers/MoviesController', function() {
    it('should have the index function', function(done) {
        request(url)
            .get('/movies')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should have the show function', function(done) {
        request(url)
            .get('/movies/1')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});