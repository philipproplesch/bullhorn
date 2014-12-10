angular.module('bullhorn', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('control', {
        url: '/control',
        templateUrl: 'templates/control.html',
        controller: 'ControlCtrl'
      })
      .state('listen', {
        url: '/listen',
        templateUrl: 'templates/listen.html',
        controller: 'ListenCtrl'
      })
    ;

    $urlRouterProvider.otherwise('/');
  });
