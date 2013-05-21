var Model = module.exports = function() {
}

Model.prototype.save = function() {
  // TODO: Not async safe; Fix this
  this.id = Model.id++;
  Model.DB.save(this.name, this);
}

Model.findBy = function(label, value) {
}

Model.DB = require('../lib/db.js');
Model.id = 0;
