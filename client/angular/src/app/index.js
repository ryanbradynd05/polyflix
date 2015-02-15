'use strict';
/*jshint esnext: true */

import TmdbFactory from './factories/tmdb.factory';
import MoviesCtrl from './controllers/movies.controller';
import MovieSearchCtrl from './controllers/movie-search.controller';
import MovieViewCtrl from './controllers/movie-view.controller';

angular.module('polyflix', ['ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ngRoute', 'mgcrea.ngStrap'])
  .factory('TmdbFactory', TmdbFactory.tmdbFactory)
  .controller('MoviesCtrl', MoviesCtrl)
  .controller('MovieSearchCtrl', MovieSearchCtrl)
  .controller('MovieViewCtrl', MovieViewCtrl)
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3000');
    RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json'
    });
    RestangularProvider.setResponseInterceptor(function(response, operation, route, url) {
      var newResponse;
      console.log('Restangular Response:',response, operation, route, url);
      if (operation === 'getList') {
        newResponse = response[route];
        newResponse.metadata = response.meta;
      } else {
        newResponse = response;
      }
      return newResponse;
    });
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/movies', {
        templateUrl: 'app/partials/movies.hbs',
        controller: 'MoviesCtrl',
        controllerAs: 'ctrl'
      })
      .when('/movies/search', {
        templateUrl: 'app/partials/movie-search.hbs',
        controller: 'MovieSearchCtrl',
        controllerAs: 'ctrl'
      })
      .when('/movies/view/:movieId', {
        templateUrl: 'app/partials/movie-view.hbs',
        controller: 'MovieViewCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/movies'
      });
  });