'use strict';

describe('tmdb Factory', function() {
  var TmdbFactory, httpBackend;
  var baseUrl = 'http://localhost:3000/';
  var configUrl = baseUrl + 'configs';
  var config = {
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

  beforeEach(module('polyflix'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET(configUrl).respond(
      JSON.stringify(config)
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
      var objectImages = TmdbFactory.configuration.$object[0].images;
      var configImages = config.configs[0].images;
      expect(objectImages).toEqual(configImages);
    });
  });
});