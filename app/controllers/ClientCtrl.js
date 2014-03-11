angular.module('adon')
.controller('ClientCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  'clientItem',
  function($scope, $rootScope, $http, $q, $timeout, clientItem) {

    $scope.client = clientItem;
  }
]);
