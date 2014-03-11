angular.module('adon')
.controller('DashboardCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  'clientList',
  function($scope, $rootScope, $http, $q, $timeout, clientList) {

    $scope.clients = clientList;


  }
]);
