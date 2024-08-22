const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true, trim: true },
  is_verified: { type: Boolean, default: false },
  roles: { type: [String], enum: ["user", "admin"], default: ["user"] },
});

module.exports = mongoose.model("User", UserSchema);
