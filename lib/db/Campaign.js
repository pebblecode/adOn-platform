var Sequelize = require('sequelize');
var HashID = require('hashids');

module.exports = function(Instance) {

  Instance.db.Campaign = Instance.db.sequelize.define('campaign', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shortcode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    projectId: {
      type: Sequelize.INTEGER,
      references: 'projects',
      referenceKey: 'id',
      onDelete: 'cascade'
    }
  }, {
    instanceMethods: {
      generateShortcode: function(salt, minLength) {
        var hash = new HashID(salt || 'this is a salt', minLength || 8);
        var shortcode = HashID.encrypt(new Date().getUTCMilliseconds());
        this.shortcode = shortcode;
      }
    }
  });

};
