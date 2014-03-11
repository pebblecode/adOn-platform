angular.module('adon')
  .service('Projects', [
    '$rootScope',
    '$http',
    '$q',
    function($rootScope, $http, $q) {

      this.get = function() {
        return $http.get('/api/projects').then(function(projects) {
          return projects.data;
        });
      };

      this.getOne = function(pid) {
        return $http.get('/api/projects/' + pid).then(function(project) {
          return project.data;
        });
      };
    }
]);
