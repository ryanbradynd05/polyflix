'use strict';

describe('tmdb Factory', function() {
  var TmdbFactory, httpBackend;
  var baseUrl = 'http://localhost:3000/';
  var configUrl = baseUrl + 'configs';
  var config = {
    configs: [{
      images: {
        base_url: 'http://image.tmdb.org/t/p/', // jshint ignore:line
        secure_base_url: 'https://image.tmdb.org/t/p/', // jshint ignore:line
        backdrop_sizes: ['w300', 'w780', 'w1280', 'original'], // jshint ignore:line
        logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'], // jshint ignore:line
        poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'], // jshint ignore:line
        profile_sizes: ['w45', 'w185', 'h632', 'original'], // jshint ignore:line
        still_sizes: ['w92', 'w185', 'w300', 'original'] // jshint ignore:line
      }
    }]
  };
  var allMoviesUrl = baseUrl + 'movies';
  var allMovies = {
    movies: [{
      title: 'Fight Club',
      themoviedbid: 550,
      id: 1,
      createdAt: '2015-02-13T05:44:34.000Z',
      updatedAt: '2015-02-13T05:44:34.000Z'
    }, {
      title: 'Guardians of the Galaxy',
      themoviedbid: 118340,
      id: 5,
      createdAt: '2015-02-13T06:19:29.000Z',
      updatedAt: '2015-02-13T06:19:29.000Z'
    }]
  };

  beforeEach(module('polyflix'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET(configUrl).respond(
      JSON.stringify(config)
    );
    httpBackend.whenGET(allMoviesUrl).respond(
      JSON.stringify(allMovies)
    );
  }));

  beforeEach(inject(function(_TmdbFactory_) {
    TmdbFactory = _TmdbFactory_;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('call config', function() {
    it('config should exist', function() {
      expect(TmdbFactory.configuration).toEqual(undefined);
      httpBackend.expectGET(configUrl);
      TmdbFactory.config();
      httpBackend.flush();
      var actualConfigImages = TmdbFactory.configuration.$object[0].images;
      var expectedConfigImages = config.configs[0].images;
      expect(actualConfigImages).toEqual(expectedConfigImages);
    });
  });

  describe('call all movies', function() {
    it('movies should exist', function() {
      httpBackend.expectGET(allMoviesUrl);
      var movies = TmdbFactory.all('movies');
      httpBackend.flush();
      var actualMovies = movies.$object;
      var expectedMovies = allMovies.movies;
      expect(actualMovies[0].title).toEqual(expectedMovies[0].title);
      expect(actualMovies[0].themoviedbid).toEqual(expectedMovies[0].themoviedbid);
      expect(actualMovies[0].id).toEqual(expectedMovies[0].id);
      expect(actualMovies[0].createdAt).toEqual(expectedMovies[0].createdAt);
      expect(actualMovies[0].updatedAt).toEqual(expectedMovies[0].updatedAt);
      expect(actualMovies[1].title).toEqual(expectedMovies[1].title);
      expect(actualMovies[1].themoviedbid).toEqual(expectedMovies[1].themoviedbid);
      expect(actualMovies[1].id).toEqual(expectedMovies[1].id);
      expect(actualMovies[1].createdAt).toEqual(expectedMovies[1].createdAt);
      expect(actualMovies[1].updatedAt).toEqual(expectedMovies[1].updatedAt);
    });
  });
});