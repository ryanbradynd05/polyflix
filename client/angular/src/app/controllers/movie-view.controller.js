'use strict';
/*jshint esnext: true */

class MovieViewCtrl {
  constructor(TmdbFactory,$routeParams) {
    this.TmdbFactory = TmdbFactory;
    this.$routeParams = $routeParams;
    console.log('$routeParams',$routeParams);
    this.movieInfo = this.TmdbFactory.movieInfo($routeParams.movieId);
  }
}

MovieViewCtrl.$inject = ['TmdbFactory','$routeParams'];

export default MovieViewCtrl;