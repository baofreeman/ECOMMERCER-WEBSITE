const express = require("express");
const CountryController = require("../controllers/CountryController");
const router = express.Router();

router.route("/provinces").get(CountryController.provinces);
router.route("/districts/:provinceId").get(CountryController.districts);

module.exports = router;
