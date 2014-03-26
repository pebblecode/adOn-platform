var Sequelize = require('sequelize');
var HashID = require('hashids');

module.exports = function(Instance) {

  Instance.db.Campaign = Instance.db.sequelize.define('campaign', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    classMethods: {
      generateShortcode: function(salt, minLength) {
        var hash = new HashID(salt || 'this is a salt', minLength || 8);
        var shortcode = HashID.encrypt(new Date().getUTCMilliseconds());
        return shortcode;
      }
    },
    instanceMethods: {
      generateShortcode: function(salt, minLength) {
        var hash = new HashID(salt || 'this is a salt', minLength || 8);
        var shortcode = HashID.encrypt(new Date().getUTCMilliseconds());
        this.shortcode = shortcode;
      }
    }
  });

};
