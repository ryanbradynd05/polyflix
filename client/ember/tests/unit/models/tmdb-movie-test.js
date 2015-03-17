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
var movie = null;

moduleFor('model:tmdb-movie', {
  // Specify the other units that are required for this test.
  needs: []
});

test('It creates tmdb-movies', function() {
  Ember.run(function() {
    movie = TmdbMovie.create(movieMock);
  });
  equal(movie.get('title'), 'Fight Club');
});