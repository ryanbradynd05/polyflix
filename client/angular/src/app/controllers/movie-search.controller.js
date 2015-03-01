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
    this.movies = this.TmdbFactory.movieSearch(this.query)  ;
  }

  getInfo(movie) {
    this.movieInfo = {};
    var _this = this;
    this.TmdbFactory.movieInfo(movie.id)
    .then(function(movie) {
      // console.log('Movie: ',movie);
      _this.movieInfo = movie;
      var backdropUrl = _this.TmdbFactory.getBackdropUrl(movie.backdrop_path,1); // jshint ignore:line
      movie.backdropUrl = backdropUrl;
      // console.log('backdropUrl: ',backdropUrl);
      var scope = _this.$scope.$new();
      scope.movieInfo = movie;
      // console.log('Scope',scope);
      var movieInfoModal = _this.$modal({
        scope: scope,
        placement: 'custom',
        container: 'body',
        template: 'app/partials/movie-info-modal.hbs',
        show: true
      });
      _this.movieInfoModal = movieInfoModal;

    });
  }

  closeModal() {
    this.movieInfoModal.hide();
  }

  addMovie() {
    this.closeModal();
    console.log('Add Movie');
    var newMovie = {
      title: this.movieInfo.title,
      themoviedbid: this.movieInfo.id
    };
    var _this = this;
    this.TmdbFactory.create('movies',{movie: newMovie})
    .then(function(movie) {
      console.log('Movie Added: ', movie);
      _this.$location.path('/movies');
    });
  }
}

MovieSearchCtrl.$inject = ['$scope','TmdbFactory','$modal','$location'];

export default MovieSearchCtrl;