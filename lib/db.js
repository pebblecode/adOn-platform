var Sequelize = require('sequelize');
var Bcrypt = require('bcrypt');
var HashID = require('hashids');

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
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    instanceMethods: {
      cleanup: function() {
        return 'This method has not been implemented yet';
      }
    }
  });

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

  Instance.db.User.hasMany(Instance.db.Client);

  Instance.db.Client.belongsTo(Instance.db.User);
  Instance.db.Client.hasMany(Instance.db.Project);
  Instance.db.Client.hasMany(Instance.db.Campaign);

  Instance.db.Project.belongsTo(Instance.db.Client);
  Instance.db.Project.hasMany(Instance.db.Campaign);

  Instance.db.Campaign.belongsTo(Instance.db.Client);
  Instance.db.Campaign.belongsTo(Instance.db.Project);
};
