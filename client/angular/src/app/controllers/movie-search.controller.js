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

  getPosterUrl(image, size) {
    if (image === null) {
      return '';
    }
    var config = this.TmdbFactory.config();
    var posterSizes = config.images.poster_sizes; // jshint ignore:line
    if (size === null) {
      size = posterSizes.length-1;
    }
    var url = config.images.base_url + posterSizes[size] + image; // jshint ignore:line
    return url;
  }
}

MovieSearchCtrl.$inject = ['TmdbFactory'];

export default MovieSearchCtrl;