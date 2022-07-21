const mongoose = require("mongoose");
const PointSchema = require("./Point");
const Schema = mongoose.Schema;

// Create Schema
const TableSchema = new Schema({

  ID:{
    type: Number,
    required:true

  },
  locationName: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },

  state: {
    type: String,
    required: false
  },
  zipcode: {
    type: String,
    required: false,
    max:5
  },

  locationWithinBuilding: {
    type: String,
    required: false
  },
  restroomType: {
    type: String,
    enum: ['men', 'women', 'family', 'other'],
    required: false
  },
  coordinateLocation: {
    type: PointSchema,
    required: false
  },
  tableStyle: {
    type: String,
    enum: ['fixed-height', 'adjustable', 'portable'],
    required: false
  },

  tableNotes: {
    type: String,
    required: false
  },
  publicAccessiblity: {
    type: String,
    enum: ['Patrons/Patients Only', 'Accessible to the Public'],
    required: true
  },
  hours: {
    type: String,
    required: false
  },
  contactPhone: {
    type: String,
    required: false
  },
  contactEmail: {
    type: String,
    required: false
  },
  additionalInfo: {
    type: String,
    required: false
    //prompt
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'deleted', 'reported'],
    default: 'submitted',
    required: true
  }
  
});

module.exports = Table = mongoose.model("tables", TableSchema);