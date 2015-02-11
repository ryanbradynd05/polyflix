'use strict';
/*jshint esnext: true */

class MoviesCtrl {
  constructor($scope, Restangular) {
    Restangular.all('movies').getList()
      .then(function(movies) {
        $scope.movies = movies;
        console.log("movies: ", $scope.movies);
      });
  }
}

MoviesCtrl.$inject = ['$scope', 'Restangular'];

export default MoviesCtrl;