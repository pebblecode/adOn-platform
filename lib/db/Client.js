var Sequelize = require('sequelize');
var HashID = require('hashids');

module.exports = function(Instance) {

  Instance.db.Client = Instance.db.sequelize.define('client', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: ''
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
    userId: {
      type: Sequelize.INTEGER,
      references: 'users',
      referenceKey: 'id',
      onDelete: 'cascade'
    }
  }, {
    classMethods: {

    },
    instanceMethods: {
      generateSlug: function(minLength, salt) {
        var hash = new HashID(salt || 'this is a salt', minLength || 20);
        var slug = HashID.encrypt(this.id);
        this.slug = slug;
        return this;
      }
    }
  });
};
