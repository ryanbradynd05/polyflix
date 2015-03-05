import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  host: 'http://localhost:3000',
  serialize: function(record, options) {
    console.log('YES ITS BLOODY USING THE REST SERIALIZER');
    this._super(record, options);
  }
});