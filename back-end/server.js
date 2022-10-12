const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const tables = require("./routes/api/tables");
const passportConfig = require("./config/passport");

// initialize app
const app = express();

// setup middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// db config
const db = require("./config/keys").mongoURI;
const dbSettings = {
	useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "uct_locator"
}

// connect to mongodb
mongoose.connect(db, dbSettings)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

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