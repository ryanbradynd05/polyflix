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
      id: 2,
      createdAt: '2015-02-13T06:19:29.000Z',
      updatedAt: '2015-02-13T06:19:29.000Z'
    }]
  };
  var createMovieUrl = baseUrl + 'movies';
  var createMovieResults = {
    movie: {
      title: 'The Matrix',
      themoviedbid: 603,
      id: 3,
      createdAt: '2015-02-13T05:44:34.000Z',
      updatedAt: '2015-02-13T05:44:34.000Z'
    }
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
  var infoUrl = baseUrl + 'movies/info/550';
  var infoResults = {
    adult: false,
    backdrop_path: '/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg', // jshint ignore:line
    belongs_to_collection: null, // jshint ignore:line
    budget: 63000000,
    genres: [{
      id: 18,
      name: 'Drama'
    }],
    homepage: '',
    id: 550,
    imdb_id: 'tt0137523', // jshint ignore:line
    original_language: 'en', // jshint ignore:line
    original_title: 'Fight Club', // jshint ignore:line
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground " fight clubs " forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
    popularity: 3.16634464772838,
    poster_path: '/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg', // jshint ignore:line
    production_companies: [{ // jshint ignore:line
      name: '20th Century Fox',
      id: 25
    }, {
      name: 'Fox 2000 Pictures',
      id: 711
    }, {
      name: 'Regency Enterprises',
      id: 508
    }],
    production_countries: [{ // jshint ignore:line
      iso_3166_1: 'DE', // jshint ignore:line
      name: 'Germany'
    }, {
      iso_3166_1: 'US', // jshint ignore:line
      name: 'United States of America'
    }],
    release_date: '1999-10-14', // jshint ignore:line
    revenue: 100853753,
    runtime: 139,
    spoken_languages: [{ // jshint ignore:line
      iso_639_1: 'en', // jshint ignore:line
      name: 'English'
    }],
    status: 'Released',
    tagline: 'How much can you know about yourself if you\'ve never been in a fight?',
    title: 'Fight Club',
    video: false,
    vote_average: 7.8, // jshint ignore:line
    vote_count: 3286 // jshint ignore:line
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
    httpBackend.whenPOST(createMovieUrl).respond(
      JSON.stringify(createMovieResults)
    );
    httpBackend.whenGET(searchUrl).respond(
      JSON.stringify(searchResults)
    );
    httpBackend.whenGET(infoUrl).respond(
      JSON.stringify(infoResults)
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
      var movies = TmdbFactory.all('movies');
      httpBackend.flush();
      var actualMovies = movies.$object;
      var expectedMovies = allMoviesResults.movies;
      var config = TmdbFactory.configuration.$object[0];
      expect(config).toBeDefined();
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

  describe('call add movies', function() {
    it('movies should exist', function() {
      var newMovie = {
        movie: {
          title: 'The Matrix',
          themoviedbid: 603
        }
      };
      var movie = TmdbFactory.create('movies', newMovie);
      httpBackend.flush();
      var actualMovies = movie.$object.movie;
      var expectedMovies = createMovieResults.movie;
      var config = TmdbFactory.configuration.$object[0];
      expect(config).toBeDefined();
      expect(actualMovies.title).toEqual(expectedMovies.title);
      expect(actualMovies.themoviedbid).toEqual(expectedMovies.themoviedbid);
      expect(actualMovies.id).toEqual(expectedMovies.id);
      expect(actualMovies.createdAt).toEqual(expectedMovies.createdAt);
      expect(actualMovies.updatedAt).toEqual(expectedMovies.updatedAt);
    });
  });

  describe('call search movies', function() {
    it('results should exist', function() {
      var results = TmdbFactory.movieSearch('SDF');
      httpBackend.flush();
      var actualResults = results.$object.results;
      var expectedResults = searchResults.results;
      var config = TmdbFactory.configuration.$object[0];
      expect(config).toBeDefined();
      expect(actualResults).toEqual(expectedResults);
      expect(actualResults.length).toEqual(expectedResults.length);
      expect(actualResults[0].title).toEqual(expectedResults[0].title);
      expect(actualResults[0].id).toEqual(expectedResults[0].id);
      expect(actualResults[0].release_date).toEqual(expectedResults[0].release_date); // jshint ignore:line
      expect(actualResults[0].original_title).toEqual(expectedResults[0].original_title); // jshint ignore:line
    });
  });

  describe('call info Fight Club', function() {
    it('results should exist', function() {
      var results = TmdbFactory.movieInfo(550);
      httpBackend.flush();
      var actualResults = results.$object;
      var expectedResults = infoResults;
      var config = TmdbFactory.configuration.$object[0];
      expect(config).toBeDefined();
      expect(actualResults.title).toEqual(expectedResults.title);
      expect(actualResults.id).toEqual(expectedResults.id);
      expect(actualResults.overview).toEqual(expectedResults.overview);
      expect(actualResults.tagline).toEqual(expectedResults.tagline);
      expect(actualResults.release_date).toEqual(expectedResults.release_date); // jshint ignore:line
      expect(actualResults.original_title).toEqual(expectedResults.original_title); // jshint ignore:line
    });
  });
});