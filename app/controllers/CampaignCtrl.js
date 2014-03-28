angular.module('adon')
.controller('CampaignCtrl', [
  '$scope',
  '$rootScope',
  '$window',
  '$stateParams',
  'campaignItem',
  'CRUD',
  '$state',
  'Sender',
  function($scope, $rootScope, $window, $stateParams, campaignItem, CRUD, $state, Sender) {

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
        $state.go('dashboard.campaign', {
          cid: campaign.id
        });
      });
    };

    $scope.del = function() {
      var confirm = $window.confirm('Do you wish to delete this campaign?');
      if (confirm) {
        CRUD.delete('campaign', $scope.campaign.id)
        .then(function() {
          $state.go('dashboard.project', {
            pid: $scope.campaign.projectId
          });
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
    };

    $scope.sendMessage = function(message) {
      $rootScope.$emit('playMessage', message);
    };
  }
]);
