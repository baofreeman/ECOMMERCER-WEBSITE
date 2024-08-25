const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const product = require("./v1/routers/product.js");
const order = require("./v1/routers/order.js");
const auth = require("./v1/routers/auth.js");
const country = require("./v1/routers/country.js");
const user = require("./v1/routers/user.js");

const passport = require("passport");
require("./v1/config/passport-jwt-strategy.js");

const dbConnect = require("./v1/config/dbConnect.js");
// Connect Database
dbConnect();

// Cors
const corsOptions = {
  origin: [`${process.env.CLIENT_URL}`],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// JSON
app.use(
  express.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);

// Cookie
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Passport Middleware
app.use(passport.initialize());

// Router
app.use("/api/v1/auth", auth);
app.use("/api/v1/product", product);
app.use("/api/v1/order", order);
app.use("/api/v1/country", country);
app.use("/api/v1/user", user);
app.use("/uploads", express.static("uploads"));

module.exports = app;
