'use strict';

/**
 * Movie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'movies',

  attributes: {
    title: {
      type: 'string'
    },
    themoviedbid: {
      type: 'integer',
      size: 11
    }
  }
};