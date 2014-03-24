module.exports = function(Instance) {
  require('./login.js')(Instance);
  require('./signup.js')(Instance);
  require('./dashboard.js')(Instance);

  // API
  require('./api/client')(Instance);
  require('./api/project')(Instance);
  require('./api/campaign')(Instance);

  Instance.server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: function(request, reply) {
        if (request.session._isAuthenticated()) {
          return reply().redirect('/dashboard');
        }
        return reply().redirect('/login');
      }
    }
  });
};
