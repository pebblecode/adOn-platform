var LocalStrategy = require('passport-local').Strategy;

module.exports = function(Instance) {

  var plugins = {
    yar: {
      cookieOptions: {
        password: 'adon-platform', // cookie secret
        isSecure: false // required for non-https applications
      }
    },
    travelogue: {
      hostname: Instance.config.server.host,
      port: Instance.config.server.port,
      urls: {
        failureRedirect: '/login',
        successRedirect: '/dashboard',
        failureFlash: true
      }
    }
  };

  Instance.server.pack.require(plugins, function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  Instance.server.auth.strategy('passport', 'passport');

  var Passport = Instance.server.plugins.travelogue.passport;

  Passport.use(new LocalStrategy(
    function(username, password, done) {
      Instance.db.User.find({where: {email: username} })
      .success(function(user) {
        if (!user) {
          return done(null, false, Instance.error.notFound('User not found'));
        } else if (!user.checkPassword(password)) {
          return done(null, false, Instance.error.unauthorized('Password incorrect'));
        } else {
          done(null, user.values);
        }
      })
      .error(function(err) {
        console.log(err);
        done(err);
      });
    }
  ));

  Passport.serializeUser(function (user, done) {
    done(null, user);
  });
  Passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};
