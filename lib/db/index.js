var Sequelize = require('sequelize');

module.exports = function(Instance) {
  'use strict';

  Instance.db = {
    sequelize: new Sequelize(Instance.config.database.postgres.connectionString, {
      dialect: 'postgres'
    })
  };

  require('./User.js')(Instance);
  require('./Client.js')(Instance);
  require('./Project.js')(Instance);
  require('./Campaign.js')(Instance);

  Instance.db.User.hasMany(Instance.db.Client);

  Instance.db.Client.belongsTo(Instance.db.User);
  Instance.db.Client.hasMany(Instance.db.Project);
  Instance.db.Client.hasMany(Instance.db.Campaign);

  Instance.db.Project.belongsTo(Instance.db.Client);
  Instance.db.Project.hasMany(Instance.db.Campaign);

  Instance.db.Campaign.belongsTo(Instance.db.Client);
  Instance.db.Campaign.belongsTo(Instance.db.Project);
};
