var DB = require('../lib/db.js');

var User = module.exports = function() {

  // TODO: Have an id generated by the DB guaranteed to be unique
  this.id = User.id++;

}

User.prototype.save = function() {
  DB.save('users', this);
}

// TODO: This is not thread safe. Fix this when a database choice is made.
User.id = 0;