angular.module('adon')
.controller('CampaignCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  '$location',
  '$window',
  'clientItem',
  'Campaigns',
  function($scope, $rootScope, $http, $q, $timeout, $location, $window, clientItem, Campaigns) {

    $scope.client = clientItem;

    $scope.save = function() {
      Campaigns.save($scope.client)
      .then(function(client) {
        $rootScope.emit('campaignSave', campaign);
        $location.path('/campaign/' + campaign.id);
      })
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this campaign?');
      if (confirm) {
        Campaigns.delete($scope.campaign)
        .then(function(campaign) {
          $location.path('/dashboard');
        })
      }
    };
  }
]);
