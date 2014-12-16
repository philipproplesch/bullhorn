angular.module('bullhorn')
  .service('Socket', function($q, Server, Client) {

    // TODO: Scan for free port
    var defaultPort = 52147;

    return {
      host: function() {

        function handler (req, res) {
          res.writeHead(200);
          res.end('bullhorn up and running');
        }

        var app = require('http').createServer(handler);
        var io = require('socket.io')(app);

        app.listen(defaultPort);

        Server.initialize(io);
      },

      connect: function(endpoint) {
        // TODO: Cleanup endpoint

        var deferred = $q.defer();

        var host = 'http://' + endpoint + ':' + defaultPort;

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
