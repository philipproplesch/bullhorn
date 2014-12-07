angular.module('bullhorn')
  .controller('HomeCtrl', function($scope, Spotify) {

    $scope.track = 'spotify:track:6NHBIrecf20EkEGg0Hzuqi';

    $scope.pause = function() {
      var playing = $scope.status.playing;
      Spotify.pause(playing);
    };

    $scope.play = function() {
      Spotify.play($scope.track);
    };
  });
