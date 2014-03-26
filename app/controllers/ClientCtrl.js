angular.module('adon')
.controller('ClientCtrl', [
  '$scope',
  '$rootScope',
  '$location',
  '$window',
  'clientItem',
  'CRUD',
  function($scope, $rootScope, $location, $window, clientItem, CRUD) {

    $scope.client = clientItem || {};

    $scope.save = function() {
      CRUD.save('client', $scope.client.id, {
        name: $scope.client.name,
        slug: $scope.client.slug,
        description: $scope.client.description,
        isActive: $scope.client.isActive
      })
      .then(function(client) {
        $rootScope.$emit('clientSave', client);
        $location.path('/client/' + client.id);
      })
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this client?');
      if (confirm) {
        CRUD.delete('client', $scope.client.id)
        .then(function() {
          $rootScope.$emit('clientDelete', $scope.client.id);
          $location.path('/');
        })
      }
    };
  }
]);
