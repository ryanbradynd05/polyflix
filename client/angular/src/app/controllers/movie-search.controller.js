'use strict';
/*jshint esnext: true */

class MovieSearchCtrl {
  constructor(TmdbFactory) {
    this.TmdbFactory = TmdbFactory;
    this.query = '';
    this.movies = [];
  }

  searchTmdb() {
    console.log('Search TMDB',this.query);
    this.TmdbFactory.search('movies', this.query)
    .then(function(movies) {
      this.movies = movies.results;
      console.log('movies: ', this.movies);
    }.bind(this));
  }

  getInfo(movie) {
    console.log('Get Info', movie);
  }
}

MovieSearchCtrl.$inject = ['TmdbFactory'];

export default MovieSearchCtrl;