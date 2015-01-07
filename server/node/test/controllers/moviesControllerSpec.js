var should = require('should'),
    locomotive = require('locomotive'),
    supertest = require('supertest'),
    controller = require(process.env.PWD + '/app/controllers/moviesController');

describe('Controllers/MoviesController', function() {
    before(function(done) {
        this.app = new locomotive.Locomotive();
        this.app.init('test');
        this.app.boot(__dirname, function() {
            done();
        });
    });
    it('should have the index function', function() {
        supertest.agent(this.app.express)
             .get('/movies')
             .expect(200)
             .end(function (err, res) {
               // console.log('res',res);
               should.not.exist(err);
               done();
             });
    });
    it('should have the show function', function() {
        supertest.agent(this.app.express)
             .get('/movies/1')
             .expect(200)
             .end(function (err, res) {
               // console.log('res',res);
               should.not.exist(err);
               done();
             });
    });
});