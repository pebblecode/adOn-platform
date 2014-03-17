angular.module('adon')
.controller('DashboardCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  'clientList',
  'Clients',
  function($scope, $rootScope, $http, $q, $timeout, clientList, Clients) {

    $scope.clients = clientList;

    $rootScope.$on('clientSave', function(event, client) {
      console.log(client, Clients.clientList());
      $scope.clients = Clients.clientList();
    });

    $rootScope.$on('clientDelete', function(event, clients) {
      console.log(clients);
      $scope.clients = clients;
    });
  }
]);
