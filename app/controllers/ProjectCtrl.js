angular.module('adon')
.controller('ProjectCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  'projectItem',
  function($scope, $rootScope, $http, $q, $timeout, projectItem) {

    $scope.project = projectItem;
  }
]);
