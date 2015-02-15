'use strict';
/*jshint esnext: true */

class MovieViewCtrl {
  constructor(TmdbFactory,$routeParams) {
    this.TmdbFactory = TmdbFactory;
    this.$routeParams = $routeParams;
    console.log('$routeParams',$routeParams);
    this.TmdbFactory.movieInfo($routeParams.movieId)
    .then(function(movie) {
      console.log('Movie: ',movie);
      this.movieInfo = movie;
    }.bind(this));
  }
}

MovieViewCtrl.$inject = ['TmdbFactory','$routeParams'];

export default MovieViewCtrl;