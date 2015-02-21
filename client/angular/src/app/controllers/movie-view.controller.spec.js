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
      expect(controller).toBeDefined();
    });
  });
});