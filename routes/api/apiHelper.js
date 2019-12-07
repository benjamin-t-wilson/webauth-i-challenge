const db = require("../../data/dbConfig.js");

// register user expects a username and password to be passed
// as part of the param, refer to the router or the migration for more info
function registerUser(user) {
  return db
    .insert(user)
    .into("users")
    .then(res => {
      const id = res[0];
      return db
        .select("*")
        .from("users")
        .where({ id });
    });
}

// login actually really only fetches the user, as far as
// the back end is concerned
function loginUser(user) {
  return db
    .select("*")
    .from("users")
    .where(user)
    .first();
}

// getUsers retrieves the non sensitive info from all users
function getUsers() {
  return db.select("id", "username").from("users");
}

module.exports = {
  registerUser,
  loginUser,
  getUsers
};
