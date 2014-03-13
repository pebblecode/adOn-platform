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

    $rootScope.$on('clientSave', function(client) {
      $scope.clients = Clients.clients;
    });


  }
]);
