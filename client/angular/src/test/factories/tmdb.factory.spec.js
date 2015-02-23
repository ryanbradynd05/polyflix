'use strict';

describe('tmdb factory', function() {
  var TmdbFactory, httpBackend;

  beforeEach(module('polyflix'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET(mocks.configUrl).respond(
      JSON.stringify(mocks.configResults)
    );
    httpBackend.whenGET(mocks.allMoviesUrl).respond(
      JSON.stringify(mocks.allMoviesResults)
    );
    httpBackend.whenPOST(mocks.createMovieUrl).respond(
      JSON.stringify(mocks.createMovieResults)
    );
    httpBackend.whenGET(mocks.searchUrl).respond(
      JSON.stringify(mocks.searchResults)
    );
    httpBackend.whenGET(mocks.infoUrl).respond(
      JSON.stringify(mocks.infoResults)
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
      TmdbFactory.config();
      httpBackend.flush();
      var actualConfigImages = TmdbFactory.configuration.$object[0].images;
      var expectedConfigImages = mocks.configResults.configs[0].images;
      expect(actualConfigImages).toEqual(expectedConfigImages);
    });
  });

  describe('call all movies', function() {
    it('movies should exist', function() {
      var movies = TmdbFactory.all('movies');
      httpBackend.flush();
      var actualMovies = movies.$object;
      var expectedMovies = mocks.allMoviesResults.movies;
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
      var expectedMovies = mocks.createMovieResults.movie;
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
      var expectedResults = mocks.searchResults.results;
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
      var expectedResults = mocks.infoResults;
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

  describe('get poster url', function() {
    it('should return valid url', function() {
      var nullImage ='https://d3a8mw37cqal2z.cloudfront.net/assets/f996aa2014d2ffddfda8463c479898a3/images/no-poster-w185.jpg';
      TmdbFactory.config();
      httpBackend.flush();
      var config = TmdbFactory.configuration.$object[0];
      expect(config).toBeDefined();
      var result1 = TmdbFactory.getPosterUrl();
      expect(result1).toEqual(nullImage);
      var result2 = TmdbFactory.getPosterUrl('/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg');
      expect(result2).not.toEqual(nullImage);
      expect(result2).toEqual('http://image.tmdb.org/t/p/original/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg');
      var result3 = TmdbFactory.getPosterUrl('/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg',2);
      expect(result3).not.toEqual(nullImage);
      expect(result3).toEqual('http://image.tmdb.org/t/p/w185/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg');
    });
  });

  describe('get backdrop url', function() {
    it('should return valid url', function() {
      var nullImage ='';
      TmdbFactory.config();
      httpBackend.flush();
      var config = TmdbFactory.configuration.$object[0];
      expect(config).toBeDefined();
      var result1 = TmdbFactory.getBackdropUrl();
      expect(result1).toEqual(nullImage);
      var result2 = TmdbFactory.getBackdropUrl('/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg');
      expect(result2).not.toEqual(nullImage);
      expect(result2).toEqual('http://image.tmdb.org/t/p/original/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg');
      var result3 = TmdbFactory.getBackdropUrl('/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg',2);
      expect(result3).not.toEqual(nullImage);
      expect(result3).toEqual('http://image.tmdb.org/t/p/w1280/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg');
    });
  });
});