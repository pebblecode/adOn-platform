angular.module('adon')
  .service('Clients', [
    '$rootScope',
    '$http',
    '$q',
    function($rootScope, $http, $q) {

      this.clients = [];

      this.clientList = function() {
        return this.clients;
      }.bind(this);

      this.get = function() {
        return $http.get('/clients').then(function(clients) {
          this.clients = clients.data;
          return clients.data;

        }.bind(this));
      }.bind(this);

      this.getOne = function(id) {
        return $http.get('/clients/' + id).then(function(client) {
          this.clients = this.clients.map(function(item, index) {
            if (item.id === client.data.id) {
              return client.data;
            } else {
              return item;
            }
          });
          return client.data;
        }.bind(this));
      }.bind(this);

      this.save = function(client, projectId) {
        var deferred = $q.defer();

        client.projectId = projectId;

        var method = client.id ? 'post' : 'put'
        var url = '/clients' + (client.id ? '/' + client.id : '');
        $http[method](url, client)
        .success(function(client) {
          this.clients.push(client);
          return deferred.resolve(client, this.clients);
        }.bind(this))
        .error(function(error) {
          console.error(error);
          return deferred.reject(error);
        });

        return deferred.promise;

      }.bind(this);

      this.delete = function(client) {
        var deferred = $q.defer();

        var index = this.clients.indexOf(client);

        $http.delete('/clients/' + client.id)
        .success(function() {
          this.clients.splice(index, 1);
          return deferred.resolve(this.clients);
        }.bind(this))
        .error(function(error) {
          return deferred.reject(error);
        });

        return deferred.promise;
      }.bind(this);
    }
]);
