import Ember from 'ember';
import config from 'polyflix/config/environment';
import TmdbMovie from 'polyflix/models/tmdb-movie';

export default Ember.Controller.extend({
  query: '',
  movies: Ember.A(),
  movieCount: 0,
  displayModal: function(action) {
    Ember.$('#movieInfoModal').modal(action);
  },
  actions: {
    search: function() {
      var movies = this.get('movies');
      movies.clear();
      var query = this.get('query');
      var tmdbConfig = this.store.find('config',1);
      Ember.$.get(config.restURL + '/movies/search/' + query)
      .done(response => {
        this.set('movieCount',response.total_results);
        var results = response.results;
        results.forEach(function(movieData) {
          var tmdbMovie = TmdbMovie.create(movieData);
          tmdbMovie.set('config',tmdbConfig);
          movies.pushObject(tmdbMovie);
        });
      });
    },
    getInfo: function(movie) {
      this.set('movie',movie);
      this.displayModal('show');
    },
    addMovie: function(movie) {
      console.log('addMovie',movie);
      this.displayModal('hide');
      var newMovie = this.store.createRecord('movie', {
        title: movie.title,
        themoviedbid: movie.id
      });
      newMovie.save().then(savedMovie => {
        console.log('saved',savedMovie);
        this.transitionToRoute('movies');
      });
    },
    closeModal: function() {
      console.log('closeModal');
      this.displayModal('hide');
    }
  }
});