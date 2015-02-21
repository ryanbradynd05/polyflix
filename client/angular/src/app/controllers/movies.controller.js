'use strict';
/*jshint esnext: true */

class MoviesCtrl {
  constructor(TmdbFactory,$location) {
    console.log('constructor',TmdbFactory,$location);
    this.TmdbFactory = TmdbFactory;
    this.$location = $location;
    this.movies = TmdbFactory.all('movies');
  }

  deleteMovie(movie) {
    console.log('deleteMovie',movie);
    movie.remove();
    this.movies.$object.pop(movie);
  }

  viewMovie(movie) {
    console.log('viewMovie',movie);
    this.$location.path('/movies/view/'+movie.themoviedbid);
  }
}

MoviesCtrl.$inject = ['TmdbFactory','$location'];

export default MoviesCtrl;