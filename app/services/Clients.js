angular.module('adon')
  .service('Clients', [
    '$rootScope',
    '$http',
    '$q',
    function($rootScope, $http, $q) {

      this.get = function() {
        return $http.get('/api/clients').then(function(clients) {
          return clients.data;
        });
      };

      this.getOne = function(id) {
        return $http.get('/api/clients/' + id).then(function(client) {
          return client.data;
        });
      };
    }
]);
