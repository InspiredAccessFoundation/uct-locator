const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

module.exports = User = mongoose.model("users", UserSchema);