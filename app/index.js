angular.module('adon', ['ui.router'])
.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('dashboard', {
      templateUrl: '/templates/dashboard.html', controller: 'DashboardCtrl',
      resolve: {
        clientList: ['Clients', function(Clients) {
          return Clients.get();
        }]
      }
    })
    .state('dashboard.addClient', {
      url: '/client/new',
      templateUrl: '/templates/client-edit.html',
      controller: 'ClientCtrl',
      resolve: {
        clientItem: function() {
          return {
            name: ''
          };
        }
      }
    })
    .state('dashboard.client', {
      url: '/client/:cid',
      templateUrl: '/templates/client.html',
      controller: 'ClientCtrl',
      resolve: {
        clientItem: ['Clients', '$stateParams', function(Clients, $stateParams) {
          return Clients.getOne($stateParams.cid);
        }]
      }
    })
    .state('dashboard.addProject', {
      url: '/project/new?cid',
      templateUrl: '/templates/project-edit.html',
      controller: 'ProjectCtrl',
      resolve: {
        projectItem: function() {
          return {
            name: '',
            clientId: null
          };
        }
      }
    })
    .state('dashboard.project', {
      url: '/project/:pid',
      templateUrl: '/templates/project.html',
      controller: 'ProjectCtrl',
      resolve: {
        projectItem: ['Projects', '$stateParams', function(Projects, $stateParams) {
          return Projects.getOne($stateParams.pid);
        }]
      }
    })
    .state('dashboard.addCampaign', {
      url: '/campaign/new?pid',
      templateUrl: '/templates/campaign-edit.html',
      controller: 'CampaignCtrl',
      resolve: {
        campaignItem: function() {
          return {
            name: '',
            projectId: null
          };
        }
      }
    })
    .state('dashboard.campaign', {
      url: '/campaign/:cid',
      templateUrl: '/templates/campaign.html',
      controller: 'CampaignCtrl',
      resolve: {
        campaignItem: ['Campaigns', '$stateParams', function(Campaigns, $stateParams) {
          return Campaigns.getOne($stateParams.cid);
        }]
      }
    });
}])
.run(['$state', function($state) {
  $state.transitionTo('dashboard');
}]);
