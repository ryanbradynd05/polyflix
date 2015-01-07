var should = require('should'),
    locomotive = require('locomotive'),
    models = require("../../app/models/index");

var checkAttribute = function(name, type) {
    var attribute = models.Movie.attributes[name];
    should.exist(attribute);
    should.equal(attribute.type._typeName,type);
};

describe('Model/Movie', function() {
    before(function(done) {
        this.app = new locomotive.Locomotive();
        this.app.init('test');
        this.app.boot(__dirname, function() {
            done();
        });
    });
    it('should have loaded the Movie table', function() {
        should.exist(models.Movie);
        should.equal(models.Movie.name,'Movie');
    });
    it('should have title attribute', function() {
        checkAttribute('title','VARCHAR');
    });
    it('should have themoviedbid attribute', function() {
        checkAttribute('themoviedbid','INTEGER');
    });
});