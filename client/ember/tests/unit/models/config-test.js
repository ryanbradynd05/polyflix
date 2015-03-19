import {
  moduleForModel,
  test
}
from 'ember-qunit';
import Ember from 'ember';

var configMock = {
  id: 1,
  images: {
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    logo_sizes: [
      "w45",
      "w92",
      "w154",
      "w185",
      "w300",
      "w500",
      "original"
    ],
    poster_sizes: [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
    profile_sizes: [
      "w45",
      "w185",
      "h632",
      "original"
    ],
    still_sizes: [
      "w92",
      "w185",
      "w300",
      "original"
    ]
  }
};

moduleForModel('config');

test('It stores movies', function() {
  var store = this.store();
  var record = null;
  Ember.run(function() {
    store.createRecord('config', configMock);
    record = store.find('config', 1);
  });
  equal(record.get('images.base_url'), configMock.images.base_url);
  equal(record.get('images.secure_base_url'), configMock.images.secure_base_url);
  equal(record.get('images.backdrop_sizes'), configMock.images.backdrop_sizes);
});