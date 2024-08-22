const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const {
  accessTokenAutoRefresh,
} = require("../middleware/accessTokenAutoRefresh");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Public router Products
router.route("/").get(ProductController.getProducts);
router.route("/:category").get(ProductController.getFilterProducts);
router.route("/search/:key").get(ProductController.searchProduct);
// router.route("/:category").get(ProductController.getProductsCategory);
router
  .route("/variants/:itemId")
  .get(ProductController.getProduct)
  .delete(ProductController.deleteProduct);

// Protected router Product. Is Admin
router
  .route("/create-product")
  .post(
    accessTokenAutoRefresh,
    passport.authenticate("jwt", { session: false }),
    upload.array("productImg"),
    ProductController.createProduct
  );

router
  .route("/update-product")
  .patch(
    accessTokenAutoRefresh,
    passport.authenticate("jwt", { session: false }),
    ProductController.updateProduct
  );

router
  .route("/delete-product")
  .delete(
    accessTokenAutoRefresh,
    passport.authenticate("jwt", { session: false }),
    ProductController.deleteProduct
  );

module.exports = router;
