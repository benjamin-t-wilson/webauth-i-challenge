const express = require("express");
const db = require("./apiHelper.js");
const middleware = require("./middleware.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", (req, res) => {
  const info = req.body;

  const hash = bcrypt.hashSync(info.password, 8);
  info.password = hash;

  db.registerUser(info)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Error registering new user" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.loginUser({ username })
    .then(user => {
      user && bcrypt.compareSync(password, user.password)
        ? res.status(200).json({ message: `Welcome, ${user.username}!` })
        : res.status(401).json({ message: "You shall not pass!" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error checking validity of credentials" });
    });
});

router.get("/users", middleware, (req, res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving users"})
    })
})

module.exports = router;
