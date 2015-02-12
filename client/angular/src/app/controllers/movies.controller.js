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
}

MoviesCtrl.$inject = ['TmdbFactory'];

export default MoviesCtrl;