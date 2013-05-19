var fake_db = {
  users: {},
}

var DB = module.exports = {
  save: function(model, instance) {
    fake_db[model][instance.id] = instance;
    console.log("saved users: ");
    for (key in fake_db["users"]) {
      console.log("email: " + fake_db["users"][key].email +
                  " password: " + fake_db["users"][key].password);
    }
  }
};
