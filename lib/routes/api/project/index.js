module.exports = function(Instance) {

  Instance.server.route({
    method: 'GET',
    path: '/projects',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'PUT',
    path: '/projects',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        console.log(request.params.pid);
        Instance.db.Project.find({where: {id: request.params.pid}})
        .success(function(project) {
          var vals = project.values;

          project.getCampaigns()
          .success(function(campaigns) {
            vals.campaigns = campaigns;
            reply(vals);
          })
          .error(function(error) {
            reply(error);
          })
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'POST',
    path: '/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'DELETE',
    path: '/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });
};
