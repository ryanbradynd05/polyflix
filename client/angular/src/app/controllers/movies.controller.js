'use strict';
/*jshint esnext: true */

class MoviesCtrl {
  constructor(TmdbFactory) {
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
}

MoviesCtrl.$inject = ['TmdbFactory'];

export default MoviesCtrl;