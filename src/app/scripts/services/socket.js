angular.module('bullhorn')
  .service('Socket', function($q, Client) {

    return {
      host: function() {
        require('./server/host')().start();
      },

      connect: function(endpoint) {
        var deferred = $q.defer();

        var host = endpoint;

        // Add socket.io client library
        var script = document.createElement('script');
        script.setAttribute('src', host + '/socket.io/socket.io.js');

        script.onload = function() {
          Client.initialize(host);

          deferred.resolve();
        };

        document.head.appendChild(script);

        return deferred.promise;
      }
    };
  });
