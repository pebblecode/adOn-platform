var async = require('async');

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    async.series([
      function(callback) {
        migration.dropAllTables().complete(callback);
      },
      function(callback) {
        migration.createTable('users', {
          id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
          createdAt: { type: DataTypes.DATE },
          updatedAt: { type: DataTypes.DATE },
          email: { type: DataTypes.STRING, allowNull: false },
          password: { type: DataTypes.STRING, allowNull: false }
        });
      }
    ], function(error, results) {
      done(error);
    });
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
