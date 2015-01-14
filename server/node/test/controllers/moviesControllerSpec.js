'use strict';

process.env.NODE_ENV = 'test';

var should = require('should'),
  request = require('supertest'),
  testSetup = require('../util/testSetup'),
  url = 'http://localhost:3000';

describe('Controllers/MoviesController', function() {
  before(function(done) {
    testSetup.before(done);
  });
  it('index - should return blank array', function(done) {
    request(url)
      .get('/movies')
      .expect(200)
      .end(function(err, res) {
        var movies = res.body.movies;
        should.equal(movies.length, 0);
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
      .send({movie: _movie})
      .expect(200)
      .end(function(err, res) {
        var movie = res.body.movie,
          created = (Date.parse(movie.createdAt) / 1000),
          updated = (Date.parse(movie.updatedAt) / 1000);
        movie.should.be.an.Object; // jshint ignore:line
        movie.title.should.equal(_movie.title);
        movie.themoviedbid.should.equal(_movie.themoviedbid);
        should.equal(created, updated);
        should.not.exist(err);
        if (err) {
          return done(err);
        }
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
        movie.should.be.an.Object; // jshint ignore:line
        movie.title.should.equal(_movie.title);
        movie.themoviedbid.should.equal(_movie.themoviedbid);
        should.not.exist(err);
        if (err) {
          return done(err);
        }
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
      .send({movie: _movie})
      .expect(200)
      .end(function(err, res) {
        var movie = res.body.movie;
        movie.should.be.an.Object; // jshint ignore:line
        movie.title.should.equal(_movie.title);
        movie.themoviedbid.should.equal(_movie.themoviedbid);
        should.not.exist(err);
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it('delete - should delete movie', function(done) {
    request(url)
      .delete('/movies/1')
      .expect(200)
      .end(function(err, res) {
        var movie = res.body;
        movie.should.be.an.Object; // jshint ignore:line
        movie.should.be.empty; // jshint ignore:line
        should.not.exist(err);
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it('search - should return search results from themoviedb', function(done) {
    request(url)
      .get('/movies/search/Fight%20Club')
      .expect(200)
      .end(function(err, res) {
        var searchResults = res.body;
        searchResults.should.be.an.Object; // jshint ignore:line
        searchResults.results.should.be.an.Array; // jshint ignore:line
        searchResults.results[0].title.should.equal('Fight Club');
        searchResults.results[0].id.should.equal(550);
        should.not.exist(err);
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it('info - should return movie info from themoviedb', function(done) {
    request(url)
      .get('/movies/info/550')
      .expect(200)
      .end(function(err, res) {
        var queryResult = res.body;
        queryResult.should.be.an.Object; // jshint ignore:line
        queryResult.title.should.equal('Fight Club');
        queryResult.id.should.equal(550);
        queryResult.imdb_id.should.equal('tt0137523');
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