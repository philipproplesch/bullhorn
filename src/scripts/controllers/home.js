angular.module('bullhorn')
  .controller('HomeCtrl', function($scope, $state, Socket) {

    $scope.host = function() {
      Socket.host();
      $state.go('control');
    };

    $scope.connect = function() {
      Socket.connect($scope.endpoint).then(function() {
        $state.go('listen');
      });
    };
  });
