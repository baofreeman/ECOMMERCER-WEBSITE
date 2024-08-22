const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: String, required: true },
  createAt: { type: Date, default: Date.now, expires: "15m" },
});

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);
