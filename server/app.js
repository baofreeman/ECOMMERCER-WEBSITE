const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const product = require("./api/v1/routers/product");
const order = require("./api/v1/routers/order");
const auth = require("./api/v1/routers/auth");
const country = require("./api/v1/routers/country");
const user = require("./api/v1/routers/user");

const passport = require("passport");
require("./api/v1/config/passport-jwt-strategy.js");

const dbConnect = require("./api/v1/config/dbConnect");
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
app.use("/v1/auth", auth);
app.use("/v1/product", product);
app.use("/v1/order", order);
app.use("/v1/country", country);
app.use("/v1/user", user);
app.use("/uploads", express.static("uploads"));

module.exports = app;
