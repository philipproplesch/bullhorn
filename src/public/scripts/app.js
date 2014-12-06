angular.module('bullhorn', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'public/templates/home.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });
