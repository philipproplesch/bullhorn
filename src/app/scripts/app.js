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
      .state('styles', {
        url: '/styles',
        templateUrl: 'app/templates/styles.html'
      })
    ;

    $urlRouterProvider.otherwise('/');
  });
