module.exports = function(io) {
  io.on('connection', function (socket) {
    console.log('client connected');

    socket.on('join', function(channel) {
      socket.join(channel);
      socket.emit('joinedChannel');
      console.log('joined room ' + channel);
    });

    socket.on('disconnect', function(){
      console.log('client disconnected');
    });
  });
};
