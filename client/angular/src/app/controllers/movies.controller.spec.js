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
    httpBackend.whenGET(mocks.allMoviesUrl).respond(
      JSON.stringify(mocks.allMoviesResults)
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
      expect(controller).toBeDefined();
    });
  });
});