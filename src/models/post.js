const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Post", PostSchema);
