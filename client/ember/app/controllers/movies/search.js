import Ember from 'ember';
import config from 'polyflix/config/environment';

export default Ember.Controller.extend({
  query: '',
  actions: {
    search: function() {
      var query = this.get('query');
      console.log('search', query);
      Ember.$.get(config.restURL + '/movies/search/' + query)
      .done(results => {
        console.log('search results',results);
        this.set('movies',results.results);
      });
    }
  }
});