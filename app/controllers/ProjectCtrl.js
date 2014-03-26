angular.module('adon')
.controller('ProjectCtrl', [
  '$scope',
  '$rootScope',
  '$location',
  '$window',
  '$stateParams',
  'projectItem',
  'CRUD',
  function($scope, $rootScope, $location, $window, $stateParams, projectItem, CRUD) {

    $scope.project = projectItem || {};

    $scope.save = function() {
      CRUD.save('project', $scope.project.id, {
        name: $scope.project.name,
        description: $scope.project.description,
        isActive: $scope.project.isActive,
        clientId: $stateParams.cid
      })
      .then(function(project) {
        $rootScope.$emit('projectSave', project);
        $location.path('/project/' + project.id);
      })
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this project?');
      if (confirm) {
        CRUD.delete('project', $scope.project.id)
        .then(function() {
          $location.path('/client/' + $scope.project.clientId);
        })
      }
    };
  }
]);
