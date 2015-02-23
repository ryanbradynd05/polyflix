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
});