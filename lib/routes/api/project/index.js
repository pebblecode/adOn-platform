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
      validate: {
        payload: {
          name: Instance.Hapi.types.string(),
          description: Instance.Hapi.types.string().allow(''),
          isActive: Instance.Hapi.types.boolean(),
          clientId: Instance.Hapi.types.number()
        }
      },
      handler: function(request, reply) {
        var project = Instance.db.Project.build(request.payload);
        project.save()
        .success(function(project) {
          reply(project);
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {

        Instance.db.Project.find({
          where: { id: request.params.pid },
          include: [{
            model: Instance.db.Campaign,
            as: 'campaigns'
          }, {
            model: Instance.db.Client,
            as: 'client'
          }]
        })
        .success(function(project) {
          reply(project);
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
      validate: {
        payload: {
          name: Instance.Hapi.types.string(),
          description: Instance.Hapi.types.string().allow(''),
          isActive: Instance.Hapi.types.boolean(),
          clientId: Instance.Hapi.types.number()
        }
      },
      handler: function(request, reply) {
        Instance.db.Project.find({where: {id: request.params.pid}})
        .success(function(project) {
          project.updateAttributes(request.payload)
          .success(function(project) {
            reply(project);
          })
          .error(function(error) {
            reply(error);
          });
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'DELETE',
    path: '/projects/{pid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Project.destroy({id: request.params.pid})
        .success(function() {
          reply({success: true});
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });
};
