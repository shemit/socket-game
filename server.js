var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var Model = require('./models/model');
var User = require('./models/user.model');


server.listen(80);

app.use(express.static(__dirname + '/public'));

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.get("/", function(req, res) {
  res.render('index',
    { "title": "Such a Fun Game!",
    });
});

// ==================== User routes here ===================== //
// TODO: Move into a routes.js file
// TODO: Route to a controller
// =========================================================== //
app.get("/user/new", function(req, res) {
  res.render("user/new", { "title": "Register for an Account" });
});
app.get("/user", function(req, res) {
  res.render("user/index", {"title": "User Index"});
});
app.get("/user/:id", function(req, res) {
  // get user based off of the ID here
  var id = req.params.id;
  console.log(Model.DB.find('user', null, null));
  res.render("user/", {"title": "User Index"});
});
app.get("/user/:id/edit", function(req, res) {
  // get user based off of the id here
  var id = req.params.id;
  res.render("user/edit", {"title": "User Index"});
});
app.put("/user/:id/put", function(req, res) {
  var id = req.params.id;
  res.redirect("/user/" + id);
});
// TODO: Store all of the user information with salted information in the db
//       Get this working as soon as possible, then stress test and security
//       check with edge/corner cases.
app.post("/user", function(req, res) {
  var user = new User();
  user.email = req.param('email', null);
  user.password = req.param('password', null);
  user.save();
  res.redirect("/user");
});
app.get("/register", function(req, res) {
  res.render("user/new", { "title": "Register for an Account" });
});
// ==================== End User Routes ======================== //

app.get("/game", function(req, res) {
  res.send("Some game");
});

// Websockets for the game here.
var game = io
  .of('/game')
  .on('connection', function(socket) {
  });
