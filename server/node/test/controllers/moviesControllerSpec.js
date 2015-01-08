process.env.NODE_ENV = 'test';

var should = require('should'),
    request = require('supertest'),
    url = 'http://localhost:3000';
describe('Controllers/MoviesController', function() {
    before(function(done) {
        request(url)
            .delete('/movies')
            .end(function(err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('index - should return blank array', function(done) {
        request(url)
            .get('/movies')
            .expect(200)
            .end(function(err, res) {
                var movies = res.body.movies;
                should.equal(movies.length,0);
                should.not.exist(err);
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('create - should create movie', function(done) {
        var _movie = {
            title: 'Fury',
            themoviedbid: 228150
        };
        request(url)
            .post('/movies')
            .send(_movie)
            .expect(200)
            .end(function(err, res) {
                var movie = res.body.movie,
                    created = Date.parse(movie.createdAt)/1000,
                    updated = Date.parse(movie.updatedAt)/1000;
                movie.should.be.an.Object;
                movie.title.should.equal(_movie.title);
                movie.themoviedbid.should.equal(_movie.themoviedbid);
                should.equal(created,updated);
                should.not.exist(err);
                if (err) { return done(err); }
                done();
            });
    });
    it('index - should return array of length 1', function(done) {
        request(url)
            .get('/movies')
            .expect(200)
            .end(function(err, res) {
                var movies = res.body.movies;
                movies.length.should.equal(1);
                should.not.exist(err);
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('show - should return movie', function(done) {
        var _movie = {
            title: 'Fury',
            themoviedbid: 228150
        };
        request(url)
            .get('/movies/1')
            .expect(200)
            .end(function(err, res) {
                var movie = res.body.movie;
                movie.should.be.an.Object;
                movie.title.should.equal(_movie.title);
                movie.themoviedbid.should.equal(_movie.themoviedbid);
                should.not.exist(err);
                if (err) { return done(err); }
                done();
            });
    });
    it('update - should update movie', function(done) {
        var _movie = {
            title: 'Interstellar',
            themoviedbid: 157336
        };
        request(url)
            .put('/movies/1')
            .send(_movie)
            .expect(200)
            .end(function(err, res) {
                var movie = res.body.movie;
                movie.should.be.an.Object;
                movie.title.should.equal(_movie.title);
                movie.themoviedbid.should.equal(_movie.themoviedbid);
                should.not.exist(err);
                if (err) { return done(err); }
                done();
            });
    });
    it('delete - should delete movie', function(done) {
        request(url)
            .delete('/movies/1')
            .expect(200)
            .end(function(err, res) {
                var movie = res.body.movie;
                console.log('delete',movie);
                movie.should.be.an.Object;
                movie.should.be.empty;
                should.not.exist(err);
                if (err) { return done(err); }
                done();
            });
    });
});