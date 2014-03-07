module.exports = function(Instance) {

  Instance.server.route({
    method: 'GET',
    path: '/dashboard',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply.view('dashboard');
      }
    }
  });
};
