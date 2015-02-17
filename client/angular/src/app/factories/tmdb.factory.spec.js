'use strict';

describe('tmdb Factory', function() {
  // var scope;

  beforeEach(module('polyflix'));

  // beforeEach(inject(function($rootScope) {
  //   scope = $rootScope.$new();
  // }));

  // it('should define more than 5 awesome things', inject(function($controller) {
  //   // expect(scope.awesomeThings).toBeUndefined();

  //   $controller('MoviesCtrl', {
  //     $scope: scope
  //   });

  //   // expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
  //   // expect(scope.awesomeThings.length > 5).toBeTruthy();
  // }));

  beforeEach(inject(function($controller, _$httpBackend_, $rootScope, _Restangular_) {
    httpBackend = _$httpBackend_;
    httpBackend.expectGET('http://localhost:3000/movies').respond('{movies: [{ title: "Fight Club", themoviedbid: 550, id: 1, createdAt: "2015-02-13T05:44:34.000Z", updatedAt: "2015-02-13T05:44:34.000Z" }, { title: "Guardians of the Galaxy", themoviedbid: 118340, id: 5, createdAt: "2015-02-13T06:19:29.000Z", updatedAt: "2015-02-13T06:19:29.000Z" }]}');
    Restangular = _Restangular_;
    scope = $rootScope.$new();
    TmdbFactory = $factory('TmdbFactory', {
      $httpBackend: httpBackend,
      $scope: scope,
      Restangular: Restangular
    });
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the mock profile list via REST ', function() {
    var allExperts = scope.allExperts;
    var resolvedValue;
    allExperts.then(function(pr) {
      resolvedValue = pr;
    });
    httpBackend.flush();
    expect(sanitizeRestangularAll(resolvedValue)[0].name).toEqual('tester');
  });
});