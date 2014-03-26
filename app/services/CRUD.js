angular.module('adon')
  .service('CRUD', [
    '$rootScope',
    '$http',
    '$q',
    function($rootScope, $http, $q) {

      this.get = function(path) {
        return $http.get('/' + path).then(function(items) {
          return items.data;
        });
      };

      this.getOne = function(path, id) {
        return $http.get('/' + (path + 's') + '/' + id).then(function(client) {
          return client.data;
        });
      };

      this.save = function(path, id, payload) {
        var deferred = $q.defer();

        $http[id ? 'post' : 'put']('/' + (path + 's') + (id ? '/' + id : ''), payload)
        .success(function(item) {
          return deferred.resolve(item);
        })
        .error(function(error) {
          return deferred.reject(error);
        });

        return deferred.promise;

      };

      this.delete = function(path, id) {
        var deferred = $q.defer();

        $http.delete('/' + (path + 's') + '/' + id)
        .success(function() {
          return deferred.resolve({success: true});
        })
        .error(function(error) {
          return deferred.reject(error);
        });

        return deferred.promise;
      };
    }
]);
