'use strict';

var mocks, baseUrl;

beforeEach(function() {
  baseUrl = 'http://localhost:3000/';
  mocks = {
    configUrl: baseUrl + 'configs',
    configResults: {
      configs: [{
        images: {
          base_url: 'http://image.tmdb.org/t/p/', // jshint ignore:line
          secure_base_url: 'https://image.tmdb.org/t/p/', // jshint ignore:line
          backdrop_sizes: ['w300', 'w780', 'w1280', 'original'], // jshint ignore:line
          logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'], // jshint ignore:line
          poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'], // jshint ignore:line
          profile_sizes: ['w45', 'w185', 'h632', 'original'], // jshint ignore:line
          still_sizes: ['w92', 'w185', 'w300', 'original'] // jshint ignore:line
        }
      }]
    },
    allMoviesUrl: baseUrl + 'movies',
    allMoviesResults: {
      movies: [{
        title: 'Fight Club',
        themoviedbid: 550,
        id: 1,
        createdAt: '2015-02-13T05:44:34.000Z',
        updatedAt: '2015-02-13T05:44:34.000Z'
      }, {
        title: 'Guardians of the Galaxy',
        themoviedbid: 118340,
        id: 2,
        createdAt: '2015-02-13T06:19:29.000Z',
        updatedAt: '2015-02-13T06:19:29.000Z'
      }]
    },
    createMovieUrl: baseUrl + 'movies',
    createMovieResults: {
      movie: {
        title: 'The Matrix',
        themoviedbid: 603,
        id: 3,
        createdAt: '2015-02-13T05:44:34.000Z',
        updatedAt: '2015-02-13T05:44:34.000Z'
      }
    },
    searchUrl: baseUrl + 'movies/search/SDF',
    searchResults: {
      page: 1,
      results: [{
        adult: false,
        backdrop_path: '/qLxJlnfZ9b2BMzvhzvnJMBi7EGH.jpg', // jshint ignore:line
        id: 14114,
        original_title: 'You Got Served', // jshint ignore:line
        release_date: '2004-01-30', // jshint ignore:line
        poster_path: '/3ESy6TiBPSYIbEES1zNspdYtMtw.jpg', // jshint ignore:line
        popularity: 0.33499858390984,
        title: 'You Got Served',
        video: false,
        vote_average: 6.3, // jshint ignore:line
        vote_count: 9 // jshint ignore:line
      }],
      total_pages: 1, // jshint ignore:line
      total_results: 1 // jshint ignore:line
    },
    infoUrl: baseUrl + 'movies/info/550',
    infoResults: {
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
    },
    deleteUrl: baseUrl + 'movies/2',
    deleteResults: {}
  };
});