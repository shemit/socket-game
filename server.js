var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

server.listen(80);

app.use(express.static(__dirname + '/public'));

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get("/", function(req, res) {
  res.render('index',
    { "title": "Such a Fun Game!",
    });
});
app.post("/user", function(req, res) {
  res.send("user is: " );
});
app.get("/register", function(req, res) {
  res.send("registering" + req.param("name"));
});
app.get("/game", function(req, res) {
  res.send("Some game");
})

// Websockets for the game here.
var game = io
  .of('/game')
  .on('connection', function(socket) {
  });
