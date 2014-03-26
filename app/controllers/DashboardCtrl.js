angular.module('adon')
.controller('DashboardCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  'clientList',
  'CRUD',
  function($scope, $rootScope, $http, $q, $timeout, clientList, CRUD) {

    $scope.clients = clientList;

    $rootScope.$on('clientSave', function(event, client) {
      var replaceIndex = -1;

      $scope.clients.forEach(function(scopeClient, index) {
        if (scopeClient.id === client.id) {
          replaceIndex = index;
        }
      });

      if (replaceIndex > -1) {
        $scope.clients.splice(replaceIndex, 1, client);
      } else {
        $scope.clients.push(client);
      }
    });

    $rootScope.$on('clientDelete', function(event, id) {
      var deleteIndex = -1;

      $scope.clients.forEach(function(scopeClient, index) {
        if (scopeClient.id === id) {
          deleteIndex = index;
        }
      });

      $scope.clients.splice(deleteIndex, 1);
    });
  }
]);
