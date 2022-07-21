const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  table_id: {
      type: Number,
      required: true
  },
  author_id: {
      type: Number,
      required: true
  },
  body: {
      type: String,
      required: true
  },
});

module.exports = Table = mongoose.model("tables", CommentSchema);