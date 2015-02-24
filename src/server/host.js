var http = require('http');
var socket = require('socket.io');

module.exports = function() {

  var getPort = function() {
    // http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
    // Dynamic and/or Private Ports (49152-65535)

    // TODO: Check if port is free and scan if necessary.
    return 52147;
  };

  return {
    start: function() {
      var port = process.env.PORT || getPort();
      var msg = 'bullhorn up and running on ' + port;

      console.log(msg);

      var app = http.createServer(function(req, res) {
        res.writeHead(200);
        res.end(msg);
      });

      var io = socket(app);

      // Register socket events.
      require('./events')(io);

      app.listen(port);
    }
  };
};
