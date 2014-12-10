angular.module('bullhorn')
  .service('Server', function(Spotify) {

    var svc = {};

    svc.initialize = function(io) {
      svc.io = io;

      io.on('connection', function (socket) {
        console.log('client connected');

        svc.socket = socket;
      });
    };

    svc.changeTrack = function(id) {
      svc.io.emit('changeTrack', id);
      Spotify.play(id);
    };

    return svc;
  });
