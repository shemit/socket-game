var Model = require('./model.js');

var User = module.exports = function() {
  Model.call(this);
  this.name = "user";
  this.id = User.id++;
}
User.prototype = new Model();
User.prototype.constructor = User;

// TODO: This is not thread safe. Fix this when a database choice is made.
User.id = 0;
