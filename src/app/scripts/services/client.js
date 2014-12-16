angular.module('bullhorn')
  .service('Client', function(Spotify) {

    var svc = {};

    svc.initialize = function(host) {
      var socket = io(host);

      socket.on('changeTrack', function(id) {
        Spotify.play(id);
      });
    };

    return svc;
  });
