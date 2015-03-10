import Ember from 'ember';
import config from 'polyflix/config/environment';
import TmdbMovie from 'polyflix/models/tmdb-movie';

export default Ember.Controller.extend({
  query: '',
  actions: {
    search: function() {
      var movies = [];
      this.set('movies', movies);
      var query = this.get('query');
      var tmdbConfig = this.tmdbConfig;
      console.log('search', query);
      Ember.$.get(config.restURL + '/movies/search/' + query)
      .done(response => {
        var results = response.results;
        results.forEach(function(movieData) {
          movieData.tmdbConfig = tmdbConfig;
          var tmdbMovie = TmdbMovie.create(movieData);
          movies.pushObject(tmdbMovie);
        });
        console.log('search results', movies);
        this.set('movies', movies);
      });
    },
    getInfo: function(movie) {
      console.log('getInfo', movie);
    }
  }
});