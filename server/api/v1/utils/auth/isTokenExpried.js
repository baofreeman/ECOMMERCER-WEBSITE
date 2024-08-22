const jwt = require("jsonwebtoken");
const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const decoded = jwt.decode(token);
    const { exp } = decoded;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp; // Adjusted logic to ensure it correctly checks expiration
  } catch (error) {
    return true; // If token is invalid, treat it as expired
  }
};

module.exports = { isTokenExpired };
