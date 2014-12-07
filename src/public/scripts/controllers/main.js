angular.module('bullhorn')
  .controller('MainCtrl', function($scope, $interval, Spotify) {

    Spotify.initialize().then(function() {

      // Check status once
      Spotify.status().then(function(response) {
        $scope.status = response;

        if (!response.running) {
          Spotify.open();
        }
      });

      $interval(function() {
        Spotify.status().then(function(response) {
          $scope.status = response;
        });
      }, 5000);
    });
  });
