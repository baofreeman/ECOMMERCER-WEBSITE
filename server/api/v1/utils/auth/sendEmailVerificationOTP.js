const transporter = require("../../config/emailConfig");
const EmailVerification = require("../../models/EmailVerification");

const sendEmailVerificationOTP = async (req, user) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    await EmailVerification.create({ userId: user._id, otp });

    const otpVerificationLink = `${process.env.CLIENT_URL}/account/verify-email`;
    const emailContent = `
      <p>Dear ${user.username},</p>
      <p>Please use the following OTP to verify your account:</p>
      <h2>OTP: ${otp}</h2>
      <p>Link verify - ${otpVerificationLink}</p>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "OTP - Verify your account",
      html: emailContent,
    });

    return otp;
  } catch (error) {
    console.error("Error sending email verification OTP:", error);
    throw new Error("Failed to send verification email. Please try again.");
  }
};

module.exports = { sendEmailVerificationOTP };
