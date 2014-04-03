angular.module('adon')
.controller('ProjectCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  '$stateParams',
  'projectItem',
  'CRUD',
  '$state',
  function($scope, $rootScope, $window, $stateParams, projectItem, CRUD, $state) {

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
        $state.go('dashboard.project', {
          pid: project.id
        });
      });
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this project?');
      if (confirm) {
        CRUD.delete('project', $scope.project.id)
        .then(function() {
          $state.go('dashboard.client', {
            cid: $scope.project.clientId
          });
        });
      }
    };

    $scope.sendMessage = function(message) {
      $rootScope.$emit('playMessage', message);
    };

    $scope.exportMessage = function(message) {

      $rootScope.$emit('exportMessage', message, function() {
        console.log('done');
      });
    };
  }
]);
