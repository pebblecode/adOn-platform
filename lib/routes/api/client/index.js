module.exports = function(Instance) {

  Instance.server.route({
    method: 'GET',
    path: '/clients',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.User.find({
          where: {id: request.session.user.id},
        })
        .success(function(user) {
          user.getClients({
            attributes: ['id', 'name']
          })
          .success(function(clients) {
            reply(clients);
          })
          .error(function(error) {
            reply(error);
          });
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
          name: Instance.Hapi.types.string()
        }
      },
      handler: function(request, reply) {
        Instance.db.User.find({where: {id : request.session.user.id}})
        .success(function(user) {
          var client = Instance.db.Client.build({
            name: request.payload.name
          });

          client.save()
          .success(function() {
            client.setUser(user)
            .success(function() {

            })
            .error(function(error) {
              reply(error);
            });
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
    method: 'GET',
    path: '/clients/{cid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Client.find({where: {id: request.params.cid}})
        .success(function(client) {
          var vals = client.values;
          client.getProjects({
            attributes: ['id', 'name']
          })
          .success(function(projects) {
            vals.projects = projects;
            reply(vals);
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
    method: 'POST',
    path: '/clients/{cid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
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
        .success(function(client) {
          reply({success: true});
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });
};
