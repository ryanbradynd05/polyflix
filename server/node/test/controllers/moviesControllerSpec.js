var should = require('should'),
    testUtil = require('../testUtil'),
    controller = require(process.env.PWD + '/app/controllers/moviesController'),
    env = {};

describe('Controllers/MoviesController', function() {
    before(function(done) {
        env = testUtil.before();
        done();
    });
    after(function(done) {
        testUtil.after(env);
        done();
    })
    it('should have the index function', function(done) {
        env.server
            .get('/movies')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    // it('should have the show function', function() {
    //     env.server
    //         .get('/movies/1')
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             done();
    //         });
    // });
});