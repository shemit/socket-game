var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

server.listen(80);

app.use(express.static(__dirname + '/public'));

function Player(x, y, z, username){
  this.username = username;
  this.x = x;
  this.y = y;
  this.z = z;
}

var players = new Array();

// Do something when connected
io.sockets.on('connection', function (socket) {

  socket.on("populate", function(data) {
    players[data.username] = new Player(0,0,0, data["username"]);
    for (key in players) {
      var p = players[key];
      socket.emit("populate", {username: p.username,
                               x: p.x, y: p.y, z: p.z });
    }
  });

  socket.on("updatex", function(data) {
    players[data.username].x = data.x;
  }); 

  socket.on("updatey", function(data) {
    players[data.username].y = data.y;
  }); 

  socket.on("updatez", function(data) {
    players[data.username].z = data.z;
  }); 

  var tick = setInterval(serverUpdate, 50);

  socket.on("update", function(data) {
    for (key in players) {
      if (data.username != key) {
        socket.emit("update", {username: key,
                               x: players[key].x,
                               y: players[key].y,
                               z: players[key].z});
      }
    }
  });

  function serverUpdate() {
    for (key in players) {
      socket.emit("update", {username: key,
                             x: players[key].x,
                             y: players[key].y,
                             z: players[key].z});
    }
  }
});
