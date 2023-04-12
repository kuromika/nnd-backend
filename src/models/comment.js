const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  likes: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
