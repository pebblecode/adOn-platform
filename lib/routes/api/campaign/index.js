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
          description: Instance.Hapi.types.string().allow(''),
          shortcode: Instance.Hapi.types.string(),
          url: Instance.Hapi.types.string(),
          isActive:  Instance.Hapi.types.boolean(),
          projectId: Instance.Hapi.types.number()
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
      validate: {
        payload: {
          name: Instance.Hapi.types.string(),
          description: Instance.Hapi.types.string().allow(''),
          shortcode: Instance.Hapi.types.string(),
          url: Instance.Hapi.types.string(),
          isActive:  Instance.Hapi.types.boolean(),
          projectId: Instance.Hapi.types.number()
        }
      },
      handler: function(request, reply) {
        Instance.db.Campaign.find({where: {id: request.params.cid}})
        .success(function(campaign) {
          campaign.updateAttributes(request.payload)
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
