'use strict';
/*jshint esnext: true */

import MoviesCtrl from './controllers/movies.controller';

angular.module('polyflix', ['ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ngRoute', 'mgcrea.ngStrap'])
  .controller('MoviesCtrl', MoviesCtrl)
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
        controller: 'MoviesCtrl'
      })
      .otherwise({
        redirectTo: '/movies'
      });
  });