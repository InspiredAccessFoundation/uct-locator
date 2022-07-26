const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// Create Schema
const CommentSchema = new Schema({
  tableID: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  authorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Body: {
    type: String,
    required: true
  }
});
 
module.exports = comment = mongoose.model("comments", commentSchema);

