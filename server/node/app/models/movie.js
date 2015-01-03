'use strict';

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Movie', {
    title  : Sequelize.STRING
  });
};