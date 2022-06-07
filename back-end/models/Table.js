const mongoose = require("mongoose");
const PointSchema = require("./Point");
const Schema = mongoose.Schema;

// Create Schema
const TableSchema = new Schema({
  location: {
    type: PointSchema,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'deleted', 'reported'],
    default: 'submitted'
  },
  tableType: {
    type: String,
    enum: ['fixed-height', 'adjustable', 'portable'],
    required: true
  },
  restroomType: {
    type: String,
    enum: ['men', 'women', 'family', 'other'],
    required: true
  },
  hours: {
    type: String
  },
  contactPhone: {
    type: String
  },
  contactEmail: {
    type: String
  },
  publiclyAccessible: {
    type: Boolean,
    required: true
  }
});

module.exports = Table = mongoose.model("tables", TableSchema);