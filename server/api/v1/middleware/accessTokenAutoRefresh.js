const { isTokenExpired } = require("../utils/auth/isTokenExpried");
const { refreshAccessToken } = require("../utils/auth/refreshAccessToken");
const { setTokenCookies } = require("../utils/auth/setTokenCookies");

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    const accessToken = req.cookies.auth_access_token;

    // Check if access token exists and is not expired
    if (accessToken && !isTokenExpired(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
      return next(); // If valid, continue to the next middleware
    }

    const refreshToken = req.cookies.auth_refresh_token;
    if (!refreshToken || isTokenExpired(refreshToken)) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Refresh token is missing",
      });
    }

    // Refresh token is valid, request new access token
    const { newAccessToken } = await refreshAccessToken(req, res);

    if (!newAccessToken) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Failed to refresh access token",
      });
    }

    // Set the new tokens as cookies
    setTokenCookies(res, "accessToken", newAccessToken, {
      maxAge: 60 * 30 * 1000,
    });

    // Add the new access token to the Authorization header
    req.headers["authorization"] = `Bearer ${newAccessToken}`;
    next();
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    if (!res.headersSent) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Access token is missing or invalid",
      });
    }
  }
};

module.exports = { accessTokenAutoRefresh };
