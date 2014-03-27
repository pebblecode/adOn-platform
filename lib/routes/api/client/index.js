module.exports = function(Instance) {

  Instance.server.route({
    method: 'GET',
    path: '/clients',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Client.findAll({
          where: { userId: request.session.user.id },
          attributes: ['id', 'name']
        })
        .success(function(clients) {
          reply(clients);
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'PUT',
    path: '/clients',
    config: {
      auth: 'passport',
      validate: {
        payload: {
          name: Instance.Hapi.types.string(),
          description: Instance.Hapi.types.string(),
          isActive: Instance.Hapi.types.boolean()
        }
      },
      handler: function(request, reply) {
        var client = Instance.db.Client.build(request.payload);
        client.userId = request.session.user.id;

        client.save()
        .success(function(client) {
          reply(client);
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/clients/{cid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Client.find({
          where: { id: request.params.cid },
          include: [{
            model: Instance.db.Project,
            as: 'projects',
            include: [{
              model: Instance.db.Campaign,
              as: 'campaigns',
              attributes: ['id']
            }]
          }]
        })
        .success(function(client) {
          reply(client);
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'POST',
    path: '/clients/{cid}',
    config: {
      auth: 'passport',
      validate: {
        payload: {
          name: Instance.Hapi.types.string(),
          slug: Instance.Hapi.types.string().allow(''),
          description: Instance.Hapi.types.string().allow(''),
          isActive: Instance.Hapi.types.boolean()
        }
      },
      handler: function(request, reply) {
        Instance.db.Client.find({where: {id: request.params.cid}})
        .success(function(client) {
          client.updateAttributes(request.payload)
          .success(function(client) {
            reply(client);
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
    path: '/clients/{cid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Client.destroy({id: request.params.cid})
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
