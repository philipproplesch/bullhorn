angular.module('bullhorn')
  .controller('HomeCtrl', function($scope, Spotify) {

    $scope.pause = function() {
      var playing = $scope.status.playing;
      Spotify.pause(playing);
    };

    $scope.play = function() {
      Spotify.play($scope.track);
    };
  });
