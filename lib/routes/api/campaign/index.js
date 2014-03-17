module.exports = function(Instance) {

  Instance.server.route({
    method: 'GET',
    path: '/campaigns',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        reply(Instance.error.internal('Not implemented yet'));
      }
    }
  });

  Instance.server.route({
    method: 'PUT',
    path: '/campaigns',
    config: {
      auth: 'passport',
      validate: {
        payload: {
          name: Instance.Hapi.types.string(),
          projectId: Instance.Hapi.types.number(),
          shortcode: Instance.Hapi.types.string(),
          url: Instance.Hapi.types.string()
        }
      },
      handler: function(request, reply) {
        var campaign = Instance.db.Campaign.build(request.payload);

        campaign.save()
        .success(function(campaign) {
          reply(campaign);
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/campaigns/{cid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Campaign.find({
          where: { id: request.params.cid },
          include: [Instance.db.Project]
        })
        .success(function(campaign) {
          reply(campaign);
        })
        .error(function(error) {
          reply(error);
        });
      }
    }
  });

  Instance.server.route({
    method: 'POST',
    path: '/campaigns/{cid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Campaign.find({where: {id: request.params.cid}})
        .success(function(campaign) {

          campaign.updateAttributes({
            name: request.payload.name,
            shortcode: request.payload.shortcode
          })
          .success(function(campaign) {
            reply(campaign);
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
    path: '/campaigns/{cid}',
    config: {
      auth: 'passport',
      handler: function(request, reply) {
        Instance.db.Campaign.destroy({id: request.params.cid})
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
