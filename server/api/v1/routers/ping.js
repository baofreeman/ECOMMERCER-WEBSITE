const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).send("Server is alive");
});

module.exports = router;
