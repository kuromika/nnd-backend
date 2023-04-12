const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("User", UserSchema);
