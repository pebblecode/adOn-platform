module.exports = function(Instance) {

  var Passport = Instance.server.plugins.travelogue.passport;

  Instance.server.route({
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler: function(request, reply) {
        console.log(request.session);
        if (request.session._isAuthenticated()) {
          reply().redirect('/dashboard');
        } else {
          console.log(request.session.flash());
          reply.view('login.html', {
            error: request.session.flash().error ? request.session.flash().error.join(',') : ''
          });
        }
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
      handler: function(request, reply) {
        request.session._logOut();
        reply().redirect('/login');
      }
    }
  });

  Instance.server.route({
    method: 'POST',
    path: '/login',
    config: {
      validate: {
        payload: {
          username: Instance.Hapi.types.String(),
          password: Instance.Hapi.types.String()
        }
      },
      auth: false,
      handler: function(request, reply) {
        Passport.authenticate('local', {
          successRedirect: Instance.server.plugins.travelogue.settings.urls.successRedirect,
          failureRedirect: Instance.server.plugins.travelogue.settings.urls.failureRedirect,
          failureFlash: true
        })(request, reply);
      }
    }
  });

};
