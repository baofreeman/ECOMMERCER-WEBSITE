const express = require("express");
const AuthController = require("../controllers/AuthController");
const {
  accessTokenAutoRefresh,
} = require("../middleware/accessTokenAutoRefresh");
const passport = require("passport");
const router = express.Router();

// Public router Auth
router.route("/register").post(AuthController.register);
router.route("/verify-email").post(AuthController.verifyEmail);
router.route("/login").post(AuthController.login);
router.route("/refresh-token").post(AuthController.getNewAccessToken);
router
  .route("/reset-password-link")
  .post(AuthController.sendUserPasswordResetEmail);
router
  .route("/reset-password/:id/:token")
  .post(AuthController.userPasswordReset);

router.route("/logout").post(AuthController.logout);

// Protected router Auth
router
  .route("/me")
  .get(
    accessTokenAutoRefresh,
    passport.authenticate("jwt", { session: false }),
    AuthController.userProfile
  );

router
  .route("/change-password")
  .post(
    accessTokenAutoRefresh,
    passport.authenticate("jwt", { session: false }),
    AuthController.changePassword
  );
router
  .route("/logout")
  .post(
    accessTokenAutoRefresh,
    passport.authenticate("jwt", { session: false }),
    AuthController.logout
  );

module.exports = router;
