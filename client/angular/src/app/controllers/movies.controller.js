'use strict';
/*jshint esnext: true */

class MoviesCtrl {
  constructor(TmdbFactory,$location) {
    this.TmdbFactory = TmdbFactory;
    this.$location = $location;
    TmdbFactory.all('movies')
      .then(function(movies) {
        this.movies = movies;
        console.log('movies: ', this.movies);
      }.bind(this));
  }

  deleteMovie(movie) {
    console.log('deleteMovie',movie);
    movie.remove();
    this.movies.pop(movie);
  }

  viewMovie(movie) {
    console.log('viewMovie',movie);
    this.$location.path('/movies/view/'+movie.themoviedbid);
  }
}

MoviesCtrl.$inject = ['TmdbFactory','$location'];

export default MoviesCtrl;