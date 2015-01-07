var should = require('should'),
    locomotive = require('locomotive'),
    supertest = require('supertest'),
    controller = require("../../app/controllers/moviesController");

describe('Controllers/MoviesController', function() {
    before(function(done) {
        this.app = new locomotive.Locomotive();
        this.app.init('test');
        this.app.boot(__dirname, function() {
            done();
        });
    });
    it('should have the index function', function() {
        supertest(this.app.express)
             .get('/movies')
             .expect(200)
             .end(function (err, res) {
               should.not.exist(err);
               console.log('res',res);
               done();
             });
    });
});