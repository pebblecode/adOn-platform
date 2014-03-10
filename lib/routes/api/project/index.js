module.exports = function(Instance) {

  Instance.server.route({
    method: 'GET',
    path: '/api/clients/{cid}/projects',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'PUT',
    path: '/api/clients/{cid}/projects',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/api/clients/{cid}/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'POST',
    path: '/api/clients/{cid}/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'DELETE',
    path: '/api/clients/{cid}/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });
};