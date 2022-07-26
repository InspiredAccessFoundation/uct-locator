const mongoose = require("mongoose");
const PointSchema = require("./Point");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  tableID: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  uploaderID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = Picture = mongoose.model("pictures", PictureSchema);