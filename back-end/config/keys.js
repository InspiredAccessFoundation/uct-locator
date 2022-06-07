require('dotenv').config();

module.exports = {
	mongoURI: process.env['MONGO_URI'],
  secretOrKey: process.env['SECRET_KEY']
};