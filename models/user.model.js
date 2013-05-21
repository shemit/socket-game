var Model = require('./model.js');

var User = module.exports = function() {
  Model.call(this);
}
User.prototype = new Model();
User.prototype.constructor = User;

// TODO: This is not thread safe. Fix this when a database choice is made.
User.id = 0;
User.model = "user";
