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
});