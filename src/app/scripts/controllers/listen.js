angular.module('bullhorn')
  .controller('ListenCtrl', function($rootScope, $scope, Spotify) {
    $scope.pause = function() {
      var playing = $scope.status.playing;
      Spotify.pause(playing);
    };

    $scope.play = function() {
      Spotify.play($scope.track);
    };

    var selectedSearchResult =
      $rootScope.$on('bullhorn:select-result', function(e, track) {
        $scope.track = track.uri;
      });

    $scope.$on('$destroy', selectedSearchResult);
  });
