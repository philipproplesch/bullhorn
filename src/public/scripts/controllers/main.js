angular.module('bullhorn')
  .controller('MainCtrl', function(Spotify) {

    Spotify.initialize().then(function() {

      Spotify.status().then(function(response) {
        if (!response.running) {
          Spotify.open();
        }
      });
    });
  });
