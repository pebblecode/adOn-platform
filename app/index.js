angular.module('adon', ['ui.router'])
.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('dashboard', {
      templateUrl: '/templates/dashboard.html', controller: 'DashboardCtrl',
      resolve: {
        clientList: ['CRUD', function(CRUD) {
          return CRUD.get('clients');
        }]
      }
    })
    .state('dashboard.addClient', {
      url: '/client/new',
      templateUrl: '/templates/client-edit.html',
      controller: 'ClientCtrl',
      resolve: {
        clientItem: function() {
          return {};
        }
      }
    })
    .state('dashboard.editClient', {
      url: '/client/:cid/edit',
      templateUrl: '/templates/client-edit.html',
      controller: 'ClientCtrl',
      resolve: {
        clientItem: ['CRUD', '$stateParams', function(CRUD, $stateParams) {
          return CRUD.getOne('client', $stateParams.cid);
        }]
      }
    })
    .state('dashboard.client', {
      url: '/client/:cid',
      templateUrl: '/templates/client.html',
      controller: 'ClientCtrl',
      resolve: {
        clientItem: ['CRUD', '$stateParams', function(CRUD, $stateParams) {
          return CRUD.getOne('client', $stateParams.cid);
        }]
      }
    })
    .state('dashboard.addProject', {
      url: '/project/new?cid',
      templateUrl: '/templates/project-edit.html',
      controller: 'ProjectCtrl',
      resolve: {
        projectItem: function() {
          return {};
        }
      }
    })
    .state('dashboard.editProject', {
      url: '/project/:pid/edit',
      templateUrl: '/templates/project-edit.html',
      controller: 'ProjectCtrl',
      resolve: {
        projectItem: ['CRUD', '$stateParams', function(CRUD, $stateParams) {
          return CRUD.getOne('project', $stateParams.pid);
        }]
      }
    })
    .state('dashboard.project', {
      url: '/project/:pid',
      templateUrl: '/templates/project.html',
      controller: 'ProjectCtrl',
      resolve: {
        projectItem: ['CRUD', '$stateParams', function(CRUD, $stateParams) {
          return CRUD.getOne('project', $stateParams.pid);
        }]
      }
    })
    .state('dashboard.addCampaign', {
      url: '/campaign/new?pid',
      templateUrl: '/templates/campaign-edit.html',
      controller: 'CampaignCtrl',
      resolve: {
        campaignItem: function() {
          return {};
        }
      }
    })
    .state('dashboard.editCampaign', {
      url: '/campaign/:cid/edit',
      templateUrl: '/templates/campaign-edit.html',
      controller: 'CampaignCtrl',
      resolve: {
        campaignItem: ['CRUD', '$stateParams', function(CRUD, $stateParams) {
          return CRUD.getOne('campaign', $stateParams.cid);
        }]
      }
    })
    .state('dashboard.campaign', {
      url: '/campaign/:cid',
      templateUrl: '/templates/campaign.html',
      controller: 'CampaignCtrl',
      resolve: {
        campaignItem: ['CRUD', '$stateParams', function(CRUD, $stateParams) {
          return CRUD.getOne('campaign', $stateParams.cid);
        }]
      }
    });
}])
.run(['$state', function($state) {
  $state.go('dashboard');
}]);
