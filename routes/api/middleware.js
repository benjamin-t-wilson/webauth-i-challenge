const db = require("../../data/dbConfig.js");
const bcrypt = require("bcryptjs");

// this middleware expects username and password to
// be passed as headers
// then it selects the user with a matching username
// then compares the password with the hashed password
// module.exports = (req, res, next) => {
//   const { username, password } = req.headers;

//   username && password
//     ? db
//         .select("*")
//         .from("users")
//         .where({ username })
//         .first()
//         .then(res => {
//           res && bcrypt.compareSync(password, res.password)
//             ? next()
//             : res.status(401).json({ message: "Invalid Credentials" });
//         })
//         .catch(err => {
//           res
//             .status(500)
//             .json({ message: "Error checking validity of credentials" });
//         })
//     : res.status(401).json({ messasge: "Invalid credentials" });
// };

// NEW AND IMPROVED
// *DOOR KICK*
// BOOM BABY
module.exports = (req, res, next) => {
  req.session && req.session.user
    ? next()
    : res.status(401).json({ message: "You Shall Not Pass!" });
};
