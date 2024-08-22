const UserModel = require("../../models/User");
const UserRefreshTokenModel = require("../../models/UserRefreshToken");
const { generateAccessToken } = require("./generateToken");
const { verifyRefreshToken } = require("./verifyRefreshToken");

const refreshAccessToken = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return { error: "Invalid refresh token" };
    }
    // Verify Refresh Token is valid or not
    const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

    if (error) {
      return { error: "Invalid refresh token" };
    }
    // Find User based on Refresh Token detail id
    const user = await UserModel.findById(tokenDetails._id);
    if (!user) {
      return { error: "User not found" };
    }

    const userRefreshToken = await UserRefreshTokenModel.findOne({
      userId: tokenDetails._id,
    });

    if (
      oldRefreshToken !== userRefreshToken.token ||
      userRefreshToken.blacklisted
    )
      return { error: "Unauthorized access" };

    // Generate new access and refresh tokens
    const accessToken = await generateAccessToken(user);
    return {
      newAccessToken: accessToken,
    };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
};

module.exports = { refreshAccessToken };
