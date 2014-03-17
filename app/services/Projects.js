angular.module('adon')
  .service('Projects', [
    '$rootScope',
    '$http',
    '$q',
    function($rootScope, $http, $q) {

      this.projects = [];

      this.get = function() {
        return $http.get('/projects').then(function(projects) {
          return projects.data;
        });
      };

      this.getOne = function(pid) {
        return $http.get('/projects/' + pid).then(function(project) {
          return project.data;
        });
      };

      this.save = function(project, clientId) {
        var deferred = $q.defer();

        project.clientId = clientId;

        var method = project.id ? 'post' : 'put'
        var url = '/projects' + (project.id ? '/' + project.id : '');
        $http[method](url, project)
        .success(function(project) {
          this.projects.push(project);
          deferred.resolve(project);
        }.bind(this))
        .error(function(error) {
          console.error(error);
          deferred.reject(error);
        });

        return deferred.promise;

      }.bind(this);

      this.delete = function(project) {
        var deferred = $q.defer();

        var index = this.projects.indexOf(project);
        $http.delete('/projects/' + project.id)
        .success(function() {
          this.projects.splice(index, 1);
          deferred.resolve();
        }.bind(this))
        .error(function(error) {
          deferred.reject(error);
        });

        return deferred.promise;
      }.bind(this);
    }
]);
