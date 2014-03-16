var LocalStrategy = require('passport-local').Strategy;

module.exports = function(Instance) {

  Instance.server.pack.require(Instance.config.server.plugins, function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

  Instance.server.auth.strategy('passport', 'passport');

  var Passport = Instance.server.plugins.travelogue.passport;

  Passport.use(new LocalStrategy(
    function(username, password, done) {
      Instance.db.User.find({
        where: {email: username},
        attributes: ['id', 'email', 'password']
      })
      .success(function(user) {
        if (!user) {
          return done(null, false, Instance.error.notFound('User not found'));
        } else if (!user.checkPassword(password)) {
          return done(null, false, Instance.error.unauthorized('Password incorrect'));
        } else {
          delete user.password;
          done(null, user);
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
