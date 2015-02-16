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
      var backdropUrl = this.TmdbFactory.getBackdropUrl(movie.backdrop_path,1); // jshint ignore:line
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