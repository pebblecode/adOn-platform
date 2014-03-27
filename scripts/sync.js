var async = require('async');
var Instance = {
  config: {
    database: {
      postgres: {
        connectionString: process.env.HEROKU_POSTGRESQL_ROSE_URL || 'postgres://development:dev@localhost/adon-platform'
      }
    }
  }
};

require('./../lib/db')(Instance);


Instance.db.User.sync().done(function() {
  Instance.db.Client.sync().done(function() {
    Instance.db.Project.sync().done(function() {
      Instance.db.Campaign.sync();
    })
  })
});
