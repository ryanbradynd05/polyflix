import Ember from 'ember';
import config from 'polyflix/config/environment';
import TmdbMovie from 'polyflix/models/tmdb-movie';

export default Ember.Route.extend({
    model: function(params) {
        var id = params.id;
        console.log('info', id);
        return Ember.$.get(config.restURL + '/movies/info/' + id)
        .done(response => {
          var tmdbMovie = TmdbMovie.create(response);
          console.log('info result:', tmdbMovie);
          return tmdbMovie;
        });
    }
});
