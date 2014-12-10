angular.module('bullhorn')
  .controller('ControlCtrl', function($scope, Server) {

    $scope.play = function() {
      Server.changeTrack($scope.track);
    };
  });
