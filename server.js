const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const apiRouter = require("./routes/api/apiRoute.js");

const server = express();

const sessionConfig = {
  name: "babyYoda",
  secret: "is a puppet in some scenes, CGI in others",
  cookie: {
    maxAge: 1000 * 30, // max age is in miliseconds, 1000ms is 1s, * 30 makes it good for 30 seconds
    secure: false, // set to true for production
    httpOnly: true // cookie can only be transferred using http methods and is inaccessible via JS
  },
  resave: false, // don't save a new cookie if it hasn't changed
  saveUninitialized: true, // set to false for production. People must accept cookies

  store: new knexSessionStore({
    knex: require("./data/dbConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));
server.use("/api", apiRouter);

module.exports = server;
