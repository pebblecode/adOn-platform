angular.module('adon')
.controller('ClientCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  '$location',
  '$window',
  'clientItem',
  'Clients',
  function($scope, $rootScope, $http, $q, $timeout, $location, $window, clientItem, Clients) {

    $scope.client = clientItem;

    $scope.save = function() {
      Clients.save($scope.client)
      .then(function(client, clients) {
        console.log(client, clients);
        $rootScope.$emit('clientSave', client);
        $location.path('/client/' + client.id);
      })
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this client?');
      if (confirm) {
        Clients.delete($scope.client)
        .then(function(clients) {
          $rootScope.$emit('clientDelete', clients);
          $location.path('/');
        })
      }
    };
  }
]);
