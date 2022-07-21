const mongoose = require("mongoose");
const PointSchema = require("./Point");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    ID: {
        type: Number,
        required: true
      },
    tableID: {
        type: Number,
        required: true
      },
    Name: {
        type: String,
        required: false
      },
    URL: {
        type: String,
        required: true
      }

})

module.exports = Picture = mongoose.model("pictures", PictureSchema);