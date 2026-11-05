const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user ID
  name: { type: String },
  email: { type: String },
  profilePicture: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
