angular.module('bullhorn', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('listen', {
        url: '/listen/:channel',
        templateUrl: 'app/templates/listen.html',
        controller: 'ListenCtrl'
      })
    ;

    $urlRouterProvider.otherwise('/');
  });
