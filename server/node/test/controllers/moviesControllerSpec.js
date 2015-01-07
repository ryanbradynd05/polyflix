process.env.NODE_ENV = 'test';

var should = require('should'),
    app = require(process.env.PWD + '/server.js').express,
    api = require('supertest')(app);
console.log('app',app);
describe('Controllers/MoviesController', function() {
    it('should have the index function', function(done) {
        api.get('/movies')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should have the show function', function(done) {
        api.get('/movies/1')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});