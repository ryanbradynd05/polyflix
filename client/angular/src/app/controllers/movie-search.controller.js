'use strict';
/*jshint esnext: true */

class MovieSearchCtrl {
  constructor($scope,TmdbFactory,$modal,$location) {
    this.$scope = $scope;
    this.TmdbFactory = TmdbFactory;
    this.$modal = $modal;
    this.$location = $location;
    this.query = '';
    this.movies = [];
    this.movieInfo = {};
  }

  searchTmdb() {
    console.log('Search TMDB',this.query);
    this.TmdbFactory.movieSearch(this.query)
    .then(function(movies) {
      this.movies = movies.results;

      console.log('movies: ', this.movies);
    }.bind(this));
  }

  getInfo(movie) {
    console.log('Get Info', movie);
    this.movieInfo = {};
    this.TmdbFactory.movieInfo(movie.id)
    .then(function(movie) {
      console.log('Movie: ',movie);
      this.movieInfo = movie;
      var backdropUrl = this.getBackdropUrl(movie.backdrop_path,1); // jshint ignore:line
      movie.backdropUrl = backdropUrl;
      console.log('backdropUrl: ',backdropUrl);
      var scope = this.$scope.$new();
      scope.movieInfo = movie;
      console.log('Scope',scope);
      var movieInfoModal = this.$modal({
        scope: scope,
        placement: 'custom',
        container: 'body',
        template: 'app/partials/movie-info-modal.hbs',
        show: true
      });
      this.movieInfoModal = movieInfoModal;

    }.bind(this));
  }

  getPosterUrl(image, size) {
    if (image === null) {
      return '';
    }
    var config = this.TmdbFactory.config();
    var posterSizes = config.images.poster_sizes; // jshint ignore:line
    if (size === undefined) {
      size = posterSizes.length-1;
    }
    var url = config.images.base_url + posterSizes[size] + image; // jshint ignore:line
    return url;
  }

  getBackdropUrl(image, size) {
    if (image === null) {
      return '';
    }
    var config = this.TmdbFactory.config();
    var backdropSizes = config.images.backdrop_sizes; // jshint ignore:line
    if (size === undefined) {
      size = backdropSizes.length-1;
    }
    console.log('backdropSizes: ',backdropSizes,size);
    var url = config.images.base_url + backdropSizes[size] + image; // jshint ignore:line
    return url;
  }

  closeModal() {
    console.log('Close Modal');
    this.movieInfoModal.hide();
  }

  addMovie() {
    this.closeModal();
    console.log('Add Movie');
    var newMovie = {
      title: this.movieInfo.title,
      themoviedbid: this.movieInfo.id
    };
    this.TmdbFactory.create('movies',{movie: newMovie})
    .then(function(movie) {
      console.log('Movie Added: ', movie);
      this.$location.path('/movies');
    }.bind(this));
  }
}

MovieSearchCtrl.$inject = ['$scope','TmdbFactory','$modal','$location'];

export default MovieSearchCtrl;