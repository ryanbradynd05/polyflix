'use strict';

describe('movie search controller', function() {
  var httpBackend, scope, createController;
  beforeEach(module('polyflix'));

  beforeEach(inject(function($rootScope, $httpBackend, $controller) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    httpBackend.whenGET(mocks.configUrl).respond(
      JSON.stringify(mocks.configResults)
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

    createController = function() {
        return $controller('MovieSearchCtrl', {
            '$scope': scope
        });
    };
  }));

  describe('controller', function() {
    it('should exist', function() {
      var controller = createController();
      expect(controller).toBeDefined();
    });
  });

  describe('search tmdb', function() {
    it('should return movies', function() {
      var controller = createController();
      controller.query = 'SDF';
      controller.searchTmdb();
      httpBackend.flush();
      var actualResults = controller.movies.$object;
      var expectedResults = mocks.searchResults;
      expect(actualResults.page).toEqual(expectedResults.page);
      expect(actualResults.total_pages).toEqual(expectedResults.total_pages);
      expect(actualResults.total_results).toEqual(expectedResults.total_results);
      expect(actualResults.results).toEqual(expectedResults.results);
    });
  });

  describe('get info', function() {
    it('should get movie info and open modal', function() {
      var controller = createController();
      var movie = mocks.allMoviesResults.movies[0];
      controller.getInfo(movie);
      $rootScope.$digest();
      httpBackend.flush();
      scope.$apply();
      var actualMovie = controller.movieInfo;
      expect(actualMovie.title).toEqual(movie.title);
      expect(actualMovie.id).toEqual(movie.themoviedbid);
    });
  });
});