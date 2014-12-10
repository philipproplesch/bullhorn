angular.module('bullhorn')
  .controller('MainCtrl', function($scope, $interval, Spotify) {

    Spotify.initialize().then(function() {

      // Check status once
      Spotify.status().then(function(response) {
        $scope.status = response;

        if (!response.running) {
          Spotify.open().then(function() {
            // Initialize again
            Spotify.initialize();
          });
        }
      });

      $interval(function() {
        Spotify.status().then(function(response) {
          $scope.status = response;
        });
      }, 1000);
    });
  });
