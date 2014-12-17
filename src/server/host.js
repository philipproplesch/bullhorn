var http = require('http');
var socket = require('socket.io');

module.exports = function() {

  return {
    start: function() {
      var app = http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('bullhorn up and running');
      });

      var io = socket(app);

      // Register socket events.
      require('./events')(io);

      // TODO: Check if port is free!
      app.listen(process.env.PORT || 52147);
    }
  };
};
