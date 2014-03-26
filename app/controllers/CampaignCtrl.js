angular.module('adon')
.controller('CampaignCtrl', [
  '$scope',
  '$rootScope',
  '$location',
  '$window',
  '$stateParams',
  'campaignItem',
  'CRUD',
  function($scope, $rootScope, $location, $window, $stateParams, campaignItem, CRUD) {

    $scope.campaign = campaignItem || {};

    $scope.save = function() {
      CRUD.save('campaign', $scope.campaign.id, {
        name: $scope.campaign.name,
        description: $scope.campaign.description,
        shortcode: $scope.campaign.shortcode,
        url: $scope.campaign.url,
        isActive: $scope.campaign.isActive,
        projectId: $stateParams.pid
      })
      .then(function(campaign) {
        $rootScope.$emit('campaignSave', campaign);
        $location.path('/campaign/' + campaign.id);
      });
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this campaign?');
      if (confirm) {
        CRUD.delete('campaign', $scope.campaign.id)
        .then(function() {
          $location.path('/project/' + $scope.campaign.projectId);
        });
      }
    };

    $scope.generateShortcode = function(length) {
      length = length || 8;

      var shortcode = (new Array(length + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, length)).split('');

      var lastchar = null;
      for (var i = 0, j = shortcode.length; i < j; i++) {
        if (shortcode[i] == lastchar) {
          shortcode[i] = String.fromCharCode(shortcode[i].charCodeAt(0) + 1);
        }
        lastchar = shortcode[i];
      }

      $scope.campaign.shortcode = shortcode.join('');
    }
  }
]);
