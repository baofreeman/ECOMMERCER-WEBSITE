const mongoose = require("mongoose");

const UserRefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  blacklisted: { type: Boolean, default: false },
  expiresAt: { type: Date, default: Date.now, index: { expires: "1d" } },
});

module.exports = mongoose.model("UserRefreshToken", UserRefreshTokenSchema);
