angular.module('adon')
.controller('ProjectCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  '$stateParams',
  '$location',
  'projectItem',
  'Projects',
  function($scope, $rootScope, $http, $q, $timeout, $stateParams, $location, projectItem, Projects) {

    $scope.project = projectItem;

    $scope.save = function() {
      Projects.save($scope.project, $stateParams.cid)
      .then(function(project) {
        $rootScope.$emit('projectSave', project);
        $location.path('/project/' + project.id);
      })
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this project?');
      if (confirm) {
        Projects.delete($scope.project)
        .then(function() {
          $location.path('/campaign/' + $scope.project.campaignId);
        })
      }
    };
  }
]);
