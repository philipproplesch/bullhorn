angular.module('bullhorn')
  .service('Client', function($q, Spotify) {

    var svc = {};

    var socket;

    svc.initialize = function(host) {
      socket = io(host);

      socket.on('changeTrack', function(id) {
        Spotify.play(id);
      });
    };

    svc.join = function(channel) {
      var deferred = $q.defer();

      socket.emit('join', channel);

      socket.on('joinedChannel', function() {
        deferred.resolve();
      });

      return deferred.promise;
    };

    return svc;
  });
