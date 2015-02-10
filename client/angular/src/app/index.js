'use strict';
/*jshint esnext: true */

import MoviesCtrl from './movies/movies.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';

angular.module('polyflix', ['ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ngRoute', 'mgcrea.ngStrap'])
  .controller('MoviesCtrl', MoviesCtrl)
  .controller('NavbarCtrl', NavbarCtrl)

  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        templateUrl: 'app/movies/movies.html',
        controller: 'MoviesCtrl'
      })
      .otherwise({
        redirectTo: '/movies'
      });
  })
;
