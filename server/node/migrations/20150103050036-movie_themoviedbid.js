"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.addColumn(
            'Movies',
            'themoviedbid',
            DataTypes.INTEGER(7)
        ).success(done);
    },

    down: function(migration, DataTypes, done) {
        migration.removeColumn(
            'Movies',
            'themoviedbid'
        );
        done();
    }
};