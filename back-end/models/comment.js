const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// Create Schema
const commentSchema = new Schema({
 ID: {
   type: Number,
   required: true
 },
 tableID: {
   type: Number,
   required: true
 },
 authorID: {
   type: Number,
   required: true
 },
 Body: {
   type: String,
   required: true
 }
});
 
module.exports = comment = mongoose.model("comments", commentSchema);

