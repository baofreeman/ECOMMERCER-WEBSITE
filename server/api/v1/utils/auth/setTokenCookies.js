const setTokenCookies = (res, tokenName, tokenValue, options = {}) => {
  const NODE_ENV = process.env.NODE_ENV;
  try {
    res.cookie(tokenName, tokenValue, {
      httpOnly: options.httpOnly || NODE_ENV === "production",
      secure: options.secure || NODE_ENV === "production",
      maxAge: options.maxAge || 0, // Default to 0 if not provided
      ...options, // Allow overriding any other cookie options
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { setTokenCookies };
