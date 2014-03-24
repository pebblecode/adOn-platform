var async = require('async');
var Instance = {};

require('./../lib/db')(Instance);


Instance.db.User.sync().done(function() {
  Instance.db.Client.sync().done(function() {
    Instance.db.Project.sync().done(function() {
      Instance.db.Campaign.sync();
    })
  })
});
