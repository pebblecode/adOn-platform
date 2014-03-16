var Hapi = require('hapi');
var Bcrypt = require('bcrypt');

module.exports = function(Instance) {

  /**
   * Signup route - GET
   */
  Instance.server.route({
    method: 'GET',
    path: '/signup',
    config: {
      auth: false,
      handler: function(request, reply) {
        reply.view('signup', {
          pageTitle: 'Signup | AdOn Platform'
        });
      }
    }
  });

  /**
   * Signup route - POST
   */
  Instance.server.route({
    method: 'POST',
    path: '/signup',
    config: {
      auth: false,
      validate: {
        payload: {
          username: Instance.Hapi.types.String(),
          password: Instance.Hapi.types.String(),
          confirmPassword: Instance.Hapi.types.String()
        }
      },
      handler: function(request, reply) {

        var username = request.payload.username;
        var password = request.payload.password;
        var confirmPassword = request.payload.confirmPassword;

        if (password !== confirmPassword) {
          return reply(Instance.error.badRequest('Passwords do not match'));
        }

        Instance.db.User.build({
          email: username,
          password: password
        })
        .hashPassword()
        .save()
        .success(function() {
          reply().redirect('/login');
        })
        .error(function(err) {
          return reply(err);
        });
      }
    }
  });
};
