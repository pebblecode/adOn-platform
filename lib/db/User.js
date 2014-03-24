var Sequelize = require('sequelize');
var Bcrypt = require('bcrypt');

module.exports = function(Instance) {

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
    classMethods: {},
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

}
