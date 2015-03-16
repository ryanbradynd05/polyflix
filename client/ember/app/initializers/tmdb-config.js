import Ember from 'ember';
import config from 'polyflix/config/environment';

export function initialize(container, application) {

  application.deferReadiness();
  Ember.$.get(config.restURL + '/configs')
  .done(response => {
    var config = Ember.Object.create(response.configs[0]);
    application.register('tmdb:config', config, { instantiate: false, singleton: true });
    application.inject('controller', 'tmdbConfig', 'tmdb:config');
    application.advanceReadiness();
  });
}

export default {
  name: 'tmdb-config',
  initialize: initialize
};