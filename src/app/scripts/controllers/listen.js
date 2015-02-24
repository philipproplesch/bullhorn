angular.module('bullhorn')
  .controller('ListenCtrl', function($rootScope, $scope, Spotify) {
    $rootScope.$on('bullhorn:selected-search-result', function(e, track) {
      $scope.track = track.uri;
    });

    $scope.pause = function() {
      var playing = $scope.status.playing;
      Spotify.pause(playing);
    };

    $scope.play = function() {
      Spotify.play($scope.track);
    };
  });
