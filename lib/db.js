var fake_db = {
  user: {},
}

var DB = module.exports = {
  save: function(model, instance) {
    fake_db[model][instance.id] = instance;
    console.log("model was: " + model + ", email: " + 
      fake_db[model][instance.id].email);
  },
  find: function(model, field, value) {
    // TODO: Complete the ability to find a user.
    for (m in fake_db[model]) {
      var model = fake_db[model][m];
      console.log(field + ": " + model[field]);
      if (model[field] == value) {
        return model;
      }
    }
    return null;
  }
};
