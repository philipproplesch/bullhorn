angular.module('bullhorn', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('control', {
        url: '/control',
        templateUrl: 'app/templates/control.html',
        controller: 'ControlCtrl'
      })
      .state('listen', {
        url: '/listen',
        templateUrl: 'app/templates/listen.html',
        controller: 'ListenCtrl'
      })
    ;

    $urlRouterProvider.otherwise('/');
  });
