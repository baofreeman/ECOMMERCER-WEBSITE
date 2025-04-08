const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("./v1/config/swagger.js");
require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

// Cors
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const ping = require("./v1/routers/ping.js");
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

// Helmet
app.use(helmet());

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
app.disable("x-powered-by");

// Router
app.use("/api/v1/ping", ping);
app.use("/api/v1/auth", auth);
app.use("/api/v1/product", product);
app.use("/api/v1/order", order);
app.use("/api/v1/country", country);
app.use("/api/v1/user", user);
app.use("/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
