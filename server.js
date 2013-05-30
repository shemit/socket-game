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
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret:'s0m3k1nd0fst00p1ds3cr3t'}));
 // app.use(express.static(__dirname + '/public'));
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
app.put("/user/:id", function(req, res) {
  var id = req.params.id;
  var user = Model.findBy('user', 'id', id);
  user.email = req.param('email', null);
  console.log("user email on edit: " + user.email);
  user.password = req.param('password', null);
  user.save();
  res.redirect("/user/" + user.id);
});
app.get("/user/:id", function(req, res) {
  // get user based off of the ID here
  var id = req.params.id;
  var user = Model.findBy('user', 'id', id);
  res.render("user/show", {"title": "User Index", "user": user });
});
app.get("/user/:id/edit", function(req, res) {
  // get user based off of the id here
  var id = req.params.id;
  var user = Model.findBy('user', 'id', id);
  res.render("user/edit", {"title": "User Index", "user": user});
});

// TODO: Store all of the user information with salted information in the db
//       Get this working as soon as possible, then stress test and security
//       check with edge/corner cases.
app.post("/user", function(req, res) {
  var user = new User();
  user.email = req.param('email', null);
  // TODO: STORE THE PASSWORD SALTED.
  user.password = req.param('password', null);
  user.save();
  res.redirect("/user");
});
app.get("/register", function(req, res) {
  res.render("user/new", { "title": "Register for an Account" });
});
// ==================== End User Routes ======================== //


// ==================== Begin Session Routes ====================== //
app.get("/session/new", function(req, res) {
  res.render("session/new", {"title": "Sign In"});
});
app.post("/session", function(req, res) {
  var email = req.param('email', null);
  var password = req.param('password', null);
  var user = Model.findBy('user', 'email', email);
  var password = Model.findBy('user', 'password', password);
  if (user === password) {
    res.cookie('remember_token', user.rememberToken, 
      { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
  }
  res.redirect("/game");
});
app.delete("/session", function(req, res) {
});
// ==================== End Session Routes ======================== //


// ==================== Begin Game Routes ====================== //
app.get("/game", function(req, res) {
  res.send("Some game");
});

// Websockets for the game here.
var game = io
  .of('/game')
  .on('connection', function(socket) {
  });
