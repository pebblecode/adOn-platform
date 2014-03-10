var Hapi = require('hapi');

module.exports = function(config) {
  'use strict';

  var Instance = {
    Hapi: Hapi
  };

  Instance.config = config;

  Instance.error = Hapi.error;

  Instance.onError = function(error) {
    if (error) {
      console.log(error);
      process.exit(1)
    }
  }

  Instance.server = Hapi.createServer(Instance.config.server.host, parseInt(Instance.config.server.port), {
    files: Instance.config.server.files,
    views: {
      isCached: false,  // Turn off for production
      engines: { jade: 'jade' },
      path: './views'
    }
  });

  Instance.server.on('log', function(log, tags) {
    console.log('[' + Object.keys(tags).join(', ') + ']: ' + log);
  });

  Instance.init = function(done) {
    // Init features
    require('./db.js')(Instance);
    require('./static.js')(Instance);
    require('./authentication.js')(Instance);
    require('./routes')(Instance);

    Instance.server.pack.require('adon-api-clients', { Instance: Instance }, Instance.onError);

    done(Instance);
  };

  return Instance;
};
