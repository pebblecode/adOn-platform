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
        reply.view('signup.html');
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
      handler: function(request, reply) {

        var email = request.payload.email;
        var password = request.payload.password;

        Instance.db.User.build({
          email: email,
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
