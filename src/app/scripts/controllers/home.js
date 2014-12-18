angular.module('bullhorn')
  .controller('HomeCtrl', function($scope, $state, $window, Socket) {

    // REMOVE!
    $scope.endpoint = 'http://127.0.0.1:52147';

    $scope.host = function() {
      Socket.host();

      $scope.endpoint = 'http://127.0.0.1:52147';
      $scope.connect();
    };

    $scope.connect = function() {
      Socket.connect($scope.endpoint).then(function() {
        $scope.connected = true;
      });
    };

    $scope.join = function() {
      var room = $scope.room;

      if (angular.isUndefined(room) || room === '') {
        return;
      }

      Socket.join(room).then(function() {
        $state.go('listen', {
          channel: $window.encodeURIComponent(room)
        });
      });
    };
  });
