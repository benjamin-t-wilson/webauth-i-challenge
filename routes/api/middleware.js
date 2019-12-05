const db = require("../../data/dbConfig.js");
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  const { username, password } = req.headers;

  username && password
    ? db
        .select("*")
        .from("users")
        .where({ username })
        .first()
        .then(res => {
          res && bcrypt.compareSync(password, res.password)
            ? next()
            : res.status(401).json({ message: "Invalid Credentials" });
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "Error checking validity of credentials" });
        })
    : res.status(401).json({ messasge: "Invalid credentials" });
};
