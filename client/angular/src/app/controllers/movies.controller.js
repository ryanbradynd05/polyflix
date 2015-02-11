'use strict';
/*jshint esnext: true */

class MoviesCtrl {
  constructor ($scope, Restangular) {
    $scope.movies = Restangular.all('movies').getList();
  }
}

MoviesCtrl.$inject = ['$scope','Restangular'];

export default MoviesCtrl;
