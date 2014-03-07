var Confidence = require('confidence');
var Server = require('./lib/server.js');

// The basic configuration
var options = {
  server: {
    $filter: 'env',
    production: {
      host: '0.0.0.0',
      port: process.env.PORT,
      files: {
        relativeTo: __dirname + '/public'
      }
    },
    $default: {
      host: '0.0.0.0',
      port: 8001,
      files: {
        relativeTo: __dirname + '/public'
      },
      plugins: {
        yar: {
          cookieOptions: {
            password: 'adon-platform', // cookie secret
            isSecure: false // required for non-https applications
          }
        },
        travelogue: {
          hostname: '0.0.0.0',
          port: 8001,
          urls: {
            failureRedirect: '/login',
            successRedirect: '/dashboard',
            failureFlash: true
          }
        }
      }
    }
  },
  database: {
    $filter: 'env',
    production: {
      mongo: {
        connectionString: process.env.MONGOLAB_URI
      }
    },
    $default: {
      mongo: {
        connectionString: 'mongodb://localhost:27017/az-smartshare'
      },
      rethink: {
        host: 'localhost',
        port: 28015
      }
    }
  }
};

var optionsStore = new Confidence.Store(options);
var guid = Confidence.id.generate();
var criteria = Confidence.id.criteria(guid);

if (criteria === null) {
  console.error('Bad ID');
  process.exit(1);
}

criteria.env = process.env.NODE_ENV || 'development';
var config = optionsStore.get('/', criteria);

Server(config).init(function(instance) {
  instance.server.start();
});
