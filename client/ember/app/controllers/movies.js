import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteMovie: function(movie) {
      console.log('deleteMovie', movie);
    }
  }
});