angular.module('adon')
.controller('CampaignCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  '$timeout',
  '$location',
  '$window',
  'campaignItem',
  'Campaigns',
  '$stateParams',
  function($scope, $rootScope, $http, $q, $timeout, $location, $window, campaignItem, Campaigns, $stateParams) {

    $scope.campaign = campaignItem;

    $scope.save = function() {
      Campaigns.save($scope.campaign, $stateParams.pid)
      .then(function(campaign) {
        $rootScope.$emit('campaignSave', campaign);
        $location.path('/campaign/' + campaign.id);
      })
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this campaign?');
      if (confirm) {
        Campaigns.delete($scope.campaign)
        .then(function(campaign) {
          $location.path('/project/' + $scope.campaign.projectId);
        })
      }
    };
  }
]);
