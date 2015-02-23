'use strict';

describe('movies controller', function() {
  var httpBackend, scope, createController;
  beforeEach(module('polyflix'));

  beforeEach(inject(function($rootScope, $httpBackend, $controller) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    httpBackend.whenGET(mocks.configUrl).respond(
      JSON.stringify(mocks.configResults)
    );
    httpBackend.whenGET(mocks.allMoviesUrl).respond(
      JSON.stringify(mocks.allMoviesResults)
    );
    httpBackend.whenDELETE(mocks.deleteUrl).respond(
      JSON.stringify(mocks.deleteResults)
    );

    createController = function() {
        return $controller('MoviesCtrl', {
            '$scope': scope
        });
    };
  }));

  describe('controller', function() {
    it('should exist', function() {
      var controller = createController();
      httpBackend.flush();
      expect(controller).toBeDefined();
    });
  });

  describe('delete movie', function() {
    it('should delete the movie', function() {
      var controller = createController();
      httpBackend.flush();
      expect(controller.movies.$object.length).toEqual(2);
      var movie2 = controller.movies.$object[1];
      controller.deleteMovie(movie2);
      httpBackend.flush();
      expect(controller.movies.$object.length).toEqual(1);
    });
  });

  describe('view movie', function() {
    it('should show the movie', function() {
      var controller = createController();
      httpBackend.flush();
      var movie2 = controller.movies.$object[1];
      controller.viewMovie(movie2);
      expect(controller.$location.path()).toEqual('/movies/view/118340');
    });
  });
});