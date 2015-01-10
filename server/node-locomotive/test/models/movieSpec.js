var should = require('should'),
    testUtil = require('../testUtil'),
    models = require(process.env.PWD + '/app/models/index');

describe('Model/Movie', function() {
    it('should have loaded the Movie table', function() {
        should.exist(models.Movie);
        should.equal(models.Movie.name,'Movie');
    });
    it('should have title attribute', function() {
        testUtil.checkAttribute(models.Movie,'title','VARCHAR');
    });
    it('should have themoviedbid attribute', function() {
        testUtil.checkAttribute(models.Movie,'themoviedbid','INTEGER');
    });
});