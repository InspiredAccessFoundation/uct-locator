require('dotenv').config();

module.exports = {
	mongoURI: process.env['MONGO_URI'],
  secretOrKey: "secret"
};