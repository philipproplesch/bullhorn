angular.module('bullhorn')
  .controller('ListenCtrl', function($scope, Spotify) {

    $scope.pause = function() {
      var playing = $scope.status.playing;
      Spotify.pause(playing);
    };

    $scope.play = function() {
      Spotify.play($scope.track);
    };
  });
