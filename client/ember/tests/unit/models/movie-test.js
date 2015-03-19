import {
  moduleForModel,
  test
}
from 'ember-qunit';
import Ember from 'ember';

var movieMock = {
  id: 1,
  title: 'Fight Club',
  themoviedbid: 550
};

moduleForModel('movie');

test('It stores movies', function() {
  var store = this.store();
  var record = null;
  Ember.run(function() {
    store.createRecord('movie', movieMock);
    record = store.find('movie', 1);
  });
  equal(record.get('title'), movieMock.title);
  equal(record.get('themoviedbid'), movieMock.themoviedbid);
});