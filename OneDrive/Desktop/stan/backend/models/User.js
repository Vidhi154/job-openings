const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: String,
  name: String,
  tone: String,
  preferences: [String],
  memory: [String]
});

module.exports = mongoose.model("User", UserSchema);
