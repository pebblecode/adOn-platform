var Hapi = require('hapi');

module.exports = function(config) {
  'use strict';

  var Instance = {
    Hapi: Hapi
  };

  Instance.config = config;

  Instance.error = Hapi.error;

  Instance.server = Hapi.createServer(Instance.config.server.host, parseInt(Instance.config.server.port), {
    files: Instance.config.server.files,
    views: {
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

    done(Instance);
  };

  return Instance;
};