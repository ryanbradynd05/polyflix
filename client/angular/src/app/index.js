'use strict';
/*jshint esnext: true */

import MoviesCtrl from './controllers/movies.controller';

angular.module('polyflix', ['ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ngRoute', 'mgcrea.ngStrap'])
  .controller('MoviesCtrl', MoviesCtrl)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        templateUrl: 'app/partials/movies.hbs',
        controller: 'MoviesCtrl'
      })
      .otherwise({
        redirectTo: '/movies'
      });
  })
;
