angular.module('adon')
.controller('ClientCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  'clientItem',
  'CRUD',
  '$state',
  function($scope, $rootScope, $window, clientItem, CRUD, $state) {

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
        $state.go('dashboard.client', { cid: client.id });
      })
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this client?');
      if (confirm) {
        CRUD.delete('client', $scope.client.id)
        .then(function() {
          $rootScope.$emit('clientDelete', $scope.client.id);
          $state.go('dashboard');
        })
      }
    };
  }
]);
