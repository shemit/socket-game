var fake_db = {
  user: {},
}

var DB = module.exports = {
  save: function(model, instance) {
    fake_db[model][instance.id] = instance;
  },
  find: function(model, field, value) {
    // TODO: Complete the ability to find a user.
    return fake_db[model][0];
  }
};
