angular.module('bullhorn')
  .controller('HomeCtrl', function($scope, Spotify) {

    var paused = false;

    $scope.pause = function() {
      Spotify.pause(paused);
      paused = !paused;
    };

    $scope.play = function() {
      Spotify.play('spotify:track:7aATFcH1ZVz8bMdosllVSv');
    };
  });
