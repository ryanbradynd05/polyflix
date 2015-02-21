'use strict';

describe('controllers', function() {
  var httpBackend, scope, createController;
  beforeEach(module('polyflix'));

  beforeEach(inject(function($rootScope, $httpBackend, $controller) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    httpBackend.whenGET(mocks.configUrl).respond(
      JSON.stringify(mocks.configResults)
    );
    httpBackend.whenGET(mocks.infoUrl).respond(
      JSON.stringify(mocks.infoResults)
    );

    createController = function() {
        return $controller('MovieViewCtrl', {
            '$scope': scope,
            '$routeParams': {
              movieId: 550
            }
        });
    };
  }));

  describe('controller', function() {
    it('should exist', function() {
      var controller = createController();
      httpBackend.flush();
      expect(controller).toBeDefined();
      var actualResults = controller.movieInfo.$object;
      var expectedResults = mocks.infoResults;
      expect(actualResults.title).toEqual(expectedResults.title);
      expect(actualResults.id).toEqual(expectedResults.id);
      expect(actualResults.overview).toEqual(expectedResults.overview);
      expect(actualResults.tagline).toEqual(expectedResults.tagline);
      expect(actualResults.release_date).toEqual(expectedResults.release_date); // jshint ignore:line
      expect(actualResults.original_title).toEqual(expectedResults.original_title); // jshint ignore:line
    });
  });
});