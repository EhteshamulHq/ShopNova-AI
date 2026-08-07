const express = require("express");

const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  resendOTP,
} = require("../controllers/otpController");

const {
  sendOTPValidator,
  verifyOTPValidator,
  resendOTPValidator,
} = require("../validators/otpValidator");

const validateRequest = require("../middleware/validateRequest");

const {
  otpLimiter,
} = require("../middleware/rateLimiter");

router.post(
  "/send-otp",
  otpLimiter,
  sendOTPValidator,
  validateRequest,
  sendOTP
);

router.post(
  "/verify-otp",
  verifyOTPValidator,
  validateRequest,
  verifyOTP
);

router.post(
  "/resend-otp",
  otpLimiter,
  resendOTPValidator,
  validateRequest,
  resendOTP
);

module.exports = router;