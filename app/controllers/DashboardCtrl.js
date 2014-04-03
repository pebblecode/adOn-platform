angular.module('adon')
.controller('DashboardCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  'clientList',
  'CRUD',
  'Sender',
  function($scope, $rootScope, $http, $q, $timeout, clientList, CRUD, Sender) {

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

    $rootScope.$on('playMessage', function(event, message) {
      Sender.sender.sendMessage(message);
    });

    $rootScope.$on('exportMessage', function(event, message) {
      Sender.exporter.exportMessage(message);

      Sender.exporter.on('export', function(audioBlob) {
         var a = document.createElement('a');
         a.href = window.URL.createObjectURL(audioBlob);
         a.download = message + '.wav';
         a.click();
      });
    });
  }
]);
