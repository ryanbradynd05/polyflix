import Ember from 'ember';
import config from 'polyflix/config/environment';
import TmdbMovie from 'polyflix/models/tmdb-movie';

export default Ember.Route.extend({
    model: function(params) {
        var id = params.id;
        console.log('info', id);
        var tmdbConfig = this.store.find('config',1);
        return Ember.$.get(config.restURL + '/movies/info/' + id)
        .done(response => {
          var tmdbMovie = TmdbMovie.create(response);
          tmdbMovie.set('config',tmdbConfig);
          console.log('info result:', tmdbMovie);
          return tmdbMovie;
        });
    }
});
