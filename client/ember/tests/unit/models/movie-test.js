import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

var App;

moduleForModel('movie', {
  // Specify the other units that are required for this test.
  needs: []
});

test('It stores movies', function() {
  var store = this.store();
  var record = null;
  Ember.run(function() {
    store.createRecord('movie', {
      id: 1,
      title: 'Fight Club',
      themoviedbid: 550
    });
    record = store.find('movie', 1);
  });
  equal(record.get('title'), 'Fight Club');
  equal(record.get('themoviedbid'), 550);
});