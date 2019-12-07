const express = require("express");
const db = require("./apiHelper.js");
const middleware = require("./middleware.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

// register requires a body with a username and password
// it hashes the provided password and passes that
// the hashed password is what gets stored on the backend
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

// *** OLD LOGIN WITHOUT COOKIES ***
// NO FUN
// login expects a username and password on the body
// then it finds the user by matching the username
// it checks that a user was in fact returned,
// as well as if the provided password matches
// the unhashed version of what is on the backend
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   db.loginUser({ username })
//     .then(user => {
//       user && bcrypt.compareSync(password, user.password)
//         ? res.status(200).json({ message: `Welcome, ${user.username}!` })
//         : res.status(401).json({ message: "You shall not pass!" });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ message: "Error checking validity of credentials" });
//     });
// });

// *** NEW LOGIN WITH C O O K I E S ***
// FUN
// sike it's the same thing with one extra line
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.loginUser({ username })
    .then(user => {
      user && bcrypt.compareSync(password, user.password)
        ? ((req.session.user = user),
          res.status(200).json({ message: `Welcome, ${user.username}!` }))
        : res.status(401).json({ message: "You shall not pass!" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error checking validity of credentials" });
    });
});

// this runs a validation middleware before
// returning an easy list.
// please refer to the middleware
router.get("/users", middleware, (req, res) => {
  db.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving users" });
    });
});

module.exports = router;
