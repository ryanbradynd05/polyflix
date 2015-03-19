import {
  moduleFor,
  setup,
  test
}
from 'ember-qunit';
import Ember from 'ember';
import TmdbMovie from 'polyflix/models/tmdb-movie';

var movieMock = {
  adult: false,
  backdrop_path: '/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg', // jshint ignore:line
  belongs_to_collection: null, // jshint ignore:line
  budget: 63000000,
  genres: [{
    id: 18,
    name: 'Drama'
  }],
  homepage: '',
  id: 550,
  imdb_id: 'tt0137523', // jshint ignore:line
  original_language: 'en', // jshint ignore:line
  original_title: 'Fight Club', // jshint ignore:line
  overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground " fight clubs " forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
  popularity: 3.16634464772838,
  poster_path: '/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg', // jshint ignore:line
  production_companies: [{ // jshint ignore:line
    name: '20th Century Fox',
    id: 25
  }, {
    name: 'Fox 2000 Pictures',
    id: 711
  }, {
    name: 'Regency Enterprises',
    id: 508
  }],
  production_countries: [{ // jshint ignore:line
    iso_3166_1: 'DE', // jshint ignore:line
    name: 'Germany'
  }, {
    iso_3166_1: 'US', // jshint ignore:line
    name: 'United States of America'
  }],
  release_date: '1999-10-14', // jshint ignore:line
  revenue: 100853753,
  runtime: 139,
  spoken_languages: [{ // jshint ignore:line
    iso_639_1: 'en', // jshint ignore:line
    name: 'English'
  }],
  status: 'Released',
  tagline: 'How much can you know about yourself if you\'ve never been in a fight?',
  title: 'Fight Club',
  video: false,
  vote_average: 7.8, // jshint ignore:line
  vote_count: 3286 // jshint ignore:line
};
var configMock = {
  images: {
    base_url: 'http://image.tmdb.org/t/p/', // jshint ignore:line
    secure_base_url: 'https://image.tmdb.org/t/p/', // jshint ignore:line
    backdrop_sizes: ['w300', 'w780', 'w1280', 'original'], // jshint ignore:line
    logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'], // jshint ignore:line
    poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'], // jshint ignore:line
    profile_sizes: ['w45', 'w185', 'h632', 'original'], // jshint ignore:line
    still_sizes: ['w92', 'w185', 'w300', 'original'] // jshint ignore:line
  }
};
var movie = null;

moduleFor('model:tmdb-movie', {});

test('It creates tmdb-movies', function() {
  Ember.run(function() {
    movie = TmdbMovie.create(movieMock);
  });
  equal(movie.get('title'), 'Fight Club');
});

test('Gets poster URL', function() {
  Ember.run(function() {
    movie = TmdbMovie.create(movieMock);
    var config = Ember.Object.create(configMock);
    movie.set('config', config);
  });
  equal(movie.get('posterUrl'), 'http://image.tmdb.org/t/p/w185/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg');
});

test('Gets backdrop URL', function() {
  Ember.run(function() {
    movie = TmdbMovie.create(movieMock);
    var config = Ember.Object.create(configMock);
    movie.set('config', config);
  });
  equal(movie.get('backdropUrl'), 'http://image.tmdb.org/t/p/w1280/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg');
});