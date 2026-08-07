const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");


const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} = require("../validators/authValidator");
const { protect } = require("../middleware/authMiddleware");
const {
  registerLimiter,
  loginLimiter,
} = require("../middleware/rateLimiter");

router.post(
  "/register",
  registerLimiter,
  registerValidator,
  validateRequest,
  authController.register
);

router.post(
  "/login",
  loginLimiter,
  loginValidator,
  validateRequest,
  authController.login
);

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validateRequest,
  authController.forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPasswordValidator,
  validateRequest,
  authController.resetPassword
);

router.put(
  "/change-password",
  protect,
  changePasswordValidator,
  validateRequest,
  authController.changePassword
);

module.exports = router;