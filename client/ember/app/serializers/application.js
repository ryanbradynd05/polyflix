import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTSerializer.extend({
  host: config.restURL
});