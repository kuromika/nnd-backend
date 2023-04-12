const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "docModel",
  },
  docModel: { type: String, required: true, enum: ["Post", "Comment"] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Like", LikeSchema);
