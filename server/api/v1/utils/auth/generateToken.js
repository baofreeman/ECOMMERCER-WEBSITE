const jwt = require("jsonwebtoken");
const UserRefreshTokenModel = require("../../models/UserRefreshToken");

const generateAccessToken = async (user) => {
  try {
    // Validate user object
    if (!user) {
      throw new Error("Invalid user data");
    }

    // Define the payload for the token
    const payload = {
      _id: user._id,
      roles: user.roles,
    };

    // Generate the access token with expiration time
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    return accessToken;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Failed to generate access token");
  }
};

const generateRefreshToken = async (user) => {
  try {
    // Validate user object
    if (!user) {
      throw new Error("Invalid user data");
    }

    // Define the payload for the token
    const payload = {
      _id: user._id,
      roles: user.roles,
    };

    // Generate the refresh token with expiration time
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    await UserRefreshTokenModel.findOneAndDelete({
      userId: user._id,
    });

    // //  // if want to blacklist rather than remove then use below code
    // if (userRefreshToken) {
    //   userRefreshToken.blacklisted = true;
    //   await userRefreshToken.save();
    // }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // Add 1 day
    expiresAt.setMinutes(expiresAt.getMinutes() + 5); // Add 5 minutes

    // Save New Refresh Token
    new UserRefreshTokenModel({
      userId: user._id,
      token: refreshToken,
      expiresAt,
    }).save();

    return refreshToken;
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw new Error("Failed to generate refresh token");
  }
};
module.exports = { generateAccessToken, generateRefreshToken };
