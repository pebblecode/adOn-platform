module.exports = function(Instance) {

  Instance.server.method('createClient', function(request, done) {

    Instance.db.User.find({where: {id : request.session.user.id}})
    .success(function(user) {
      var client = Instance.db.Client.build({
        name: request.payload.name
      });

      client.save()
      .success(function() {
        client.setUser(user)
        .success(function() {
          done(null, client, 0);
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
  });
};
