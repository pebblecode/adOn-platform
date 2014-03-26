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

        var payload = {
          name: project.name,
          description: project.description,
          isActive: project.isActive,
          clientId: clientId
        };

        var method = project.id ? 'post' : 'put'
        var url = '/projects' + (project.id ? '/' + project.id : '');
        $http[method](url, payload)
        .success(function(updatedProject) {
          if (project.id) {
            this.projects.splice(this.projects.indexOf(project), 1, updatedProject);
          } else {
            this.projects.push(updatedProject);
          }
          deferred.resolve(updatedProject);
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
