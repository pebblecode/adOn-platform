angular.module('adon')
  .service('Campaigns', [
    '$rootScope',
    '$http',
    '$q',
    function($rootScope, $http, $q) {

      this.campaigns = [];

      this.get = function() {
        return $http.get('/campaigns').then(function(campaigns) {
          return campaigns.data;
        });
      };

      this.getOne = function(pid) {
        return $http.get('/campaigns/' + pid).then(function(campaign) {
          return campaign.data;
        });
      };

      this.save = function(campaign, projectId) {
        var deferred = $q.defer();

        campaign.projectId = projectId;

        var method = campaign.id ? 'post' : 'put'
        var url = '/campaigns' + (campaign.id ? '/' + campaign.id : '');
        $http[method](url, campaign)
        .success(function(campaign) {
          this.campaigns.push(campaign);
          deferred.resolve(campaign);
        }.bind(this))
        .error(function(error) {
          console.error(error);
          deferred.reject(error);
        });

        return deferred.promise;

      }.bind(this);

      this.delete = function(campaign) {
        var deferred = $q.defer();

        var index = this.campaigns.indexOf(campaign);
        $http.delete('/campaigns/' + campaign.id)
        .success(function() {
          this.campaigns.splice(index, 1);
          deferred.resolve();
        }.bind(this))
        .error(function(error) {
          deferred.reject(error);
        });

        return deferred.promise;
      }.bind(this);
    }
]);
