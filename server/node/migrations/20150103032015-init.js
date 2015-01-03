'use strict';

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable(
            'Movies', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: DataTypes.DATE
                },
                updatedAt: {
                    type: DataTypes.DATE
                },
                title: DataTypes.STRING,
            }
        );
        done();
    },

    down: function(migration, DataTypes, done) {
        migration.dropTable('Movies');
        done();
    }
};