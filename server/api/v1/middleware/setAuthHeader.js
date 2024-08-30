const { isTokenExpired } = require("../utils/auth/isTokenExpried");

const setAuthHeader = async (req, res, next) => {
  try {
    const accessToken = req.cookies.auth_access_token;
    if (accessToken || !isTokenExpired(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }
    next();
  } catch (error) {
    console.error("Error adding access token to header:", error.message);
  }
};

module.exports = { setAuthHeader };
