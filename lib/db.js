var Sequelize = require('sequelize');
var Bcrypt = require('bcrypt');

module.exports = function(Instance) {
  'use strict';

  Instance.db = {
    sequelize: new Sequelize('adon-platform', 'development', 'dev', {
      dialect: 'postgres'
    })
  };

  Instance.db.User = Instance.db.sequelize.define('user', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    classMethods: {

    },
    instanceMethods: {
      hashPassword: function(password) {
        this.password = Bcrypt.hashSync(this.password, 10);
        return this;
      },
      checkPassword: function(password) {
        return Bcrypt.compareSync(password, this.password);
      }
    }
  });

  Instance.db.Client = Instance.db.sequelize.define('client', {
    name: Sequelize.STRING
  });

  Instance.db.Project = Instance.db.sequelize.define('project', {
    name: Sequelize.STRING
  });

  Instance.db.Campaign = Instance.db.sequelize.define('campaign', {
    name: Sequelize.STRING,
    shortcode: Sequelize.STRING
  });

  Instance.db.User.hasMany(Instance.db.Client);
  Instance.db.Client.belongsTo(Instance.db.User);

  Instance.db.Client.hasMany(Instance.db.Project);
  Instance.db.Project.belongsTo(Instance.db.Client);

  Instance.db.Project.hasMany(Instance.db.Campaign);
  Instance.db.Campaign.belongsTo(Instance.db.Project);
};
