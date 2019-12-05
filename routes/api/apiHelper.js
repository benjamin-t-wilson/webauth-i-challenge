const db = require("../../data/dbConfig.js");
const middleware = require("./middleware.js");

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

function loginUser(user) {
  return db
    .select("*")
    .from("users")
    .where(user)
    .first()
}

function getUsers() {
  return db.select("id", "username").from("users");
}

module.exports = {
  registerUser,
  loginUser,
  getUsers
};
