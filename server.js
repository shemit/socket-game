var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

var qs = require('querystring');

server.listen(80);

app.use(express.static(__dirname + '/public'));

var users = {};

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
app.get("/user/new", function(req, res) {
  res.render("user/new", { "title": "Register for an Account" });
});
app.get("/user", function(req, res) {
  res.render("user/index", {"title": "User Index"});
});
app.get("/user/:id", function(req, res) {
  // get user based off of the ID here
  var id = req.params.id;
  res.render("user/", {"title": "User Index"});
});
app.get("/user/:id/edit", function(req, res) {
  // get user based off of the id here
  var id = req.params.id;
  res.render("user/edit", {"title": "User Index"});
});
app.post("/user", function(req, res) {
  res.send("creating a user here");
});
app.get("/register", function(req, res) {
  res.render("user/new", { "title": "Register for an Account" });
});
app.get("/game", function(req, res) {
  res.send("Some game");
});

// Websockets for the game here.
var game = io
  .of('/game')
  .on('connection', function(socket) {
  });
