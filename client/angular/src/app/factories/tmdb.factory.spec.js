'use strict';

describe('tmdb Factory', function() {
  var TmdbFactory, httpBackend;
  var baseUrl = 'http://localhost:3000/';
  var configUrl = baseUrl + 'configs';
  var configResults = {
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
  var allMoviesResults = {
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
  var searchUrl = baseUrl + 'movies/search/SDF';
  var searchResults = {
    page: 1,
    results: [{
      adult: false,
      backdrop_path: '/qLxJlnfZ9b2BMzvhzvnJMBi7EGH.jpg', // jshint ignore:line
      id: 14114,
      original_title: 'You Got Served', // jshint ignore:line
      release_date: '2004-01-30', // jshint ignore:line
      poster_path: '/3ESy6TiBPSYIbEES1zNspdYtMtw.jpg', // jshint ignore:line
      popularity: 0.33499858390984,
      title: 'You Got Served',
      video: false,
      vote_average: 6.3, // jshint ignore:line
      vote_count: 9 // jshint ignore:line
    }],
    total_pages: 1, // jshint ignore:line
    total_results: 1 // jshint ignore:line
  };

  beforeEach(module('polyflix'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET(configUrl).respond(
      JSON.stringify(configResults)
    );
    httpBackend.whenGET(allMoviesUrl).respond(
      JSON.stringify(allMoviesResults)
    );
    httpBackend.whenGET(searchUrl).respond(
      JSON.stringify(searchResults)
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
      var expectedConfigImages = configResults.configs[0].images;
      expect(actualConfigImages).toEqual(expectedConfigImages);
    });
  });

  describe('call all movies', function() {
    it('movies should exist', function() {
      httpBackend.expectGET(allMoviesUrl);
      var movies = TmdbFactory.all('movies');
      httpBackend.flush();
      var actualMovies = movies.$object;
      var expectedMovies = allMoviesResults.movies;
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

  describe('call search movies', function() {
    it('results should exist', function() {
      httpBackend.expectGET(searchUrl);
      var results = TmdbFactory.movieSearch('SDF');
      httpBackend.flush();
      var actualResults = results.$object.results;
      var expectedResults = searchResults.results;
      expect(actualResults).toEqual(expectedResults);
      expect(actualResults.length).toEqual(expectedResults.length);
      expect(actualResults[0].title).toEqual(expectedResults[0].title);
      expect(actualResults[0].id).toEqual(expectedResults[0].id);
      expect(actualResults[0].release_date).toEqual(expectedResults[0].release_date); // jshint ignore:line
      expect(actualResults[0].original_title).toEqual(expectedResults[0].original_title); // jshint ignore:line
    });
  });
});