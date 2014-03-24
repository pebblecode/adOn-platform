var Sequelize = require('sequelize');
module.exports = function(Instance) {

  Instance.db.Project = Instance.db.sequelize.define('project', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: 'clients',
      referenceKey: 'id',
      onDelete: 'cascade'
    }
  });

};
