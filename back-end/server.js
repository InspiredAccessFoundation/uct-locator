const express = require("express");
const passport = require("passport");

const users = require("./routes/api/users");
const tables = require("./routes/api/tables");
const passportConfig = require("./config/passport");

// initialize app
const app = express();

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: { error: "Too many requests, please try again later." }
});

// apply rate limiter to all requests
app.use(limiter);

// setup middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
passportConfig(passport);

// Routes
app.use("/api/users", users);
app.use("/api/tables", tables);

// listen on port
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));