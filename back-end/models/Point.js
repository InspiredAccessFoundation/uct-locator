const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

module.exports = PointSchema