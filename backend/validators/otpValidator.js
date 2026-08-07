/**
 * ===========================================================
 * OTP Validators
 * ===========================================================
 * Validates:
 * - Send OTP
 * - Verify OTP
 * - Resend OTP
 * ===========================================================
 */

const { body } = require("express-validator");

/**
 * ===========================================================
 * Common Email Validation
 * ===========================================================
 */

const emailValidation = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .withMessage("Please enter a valid email.")
  .normalizeEmail();

/**
 * ===========================================================
 * Send OTP Validation
 * ===========================================================
 */

const sendOTPValidator = [
  emailValidation,
];

/**
 * ===========================================================
 * Verify OTP Validation
 * ===========================================================
 */

const verifyOTPValidator = [
  emailValidation,

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required.")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be exactly 6 digits.")
    .isNumeric()
    .withMessage("OTP must contain only numbers."),
];

/**
 * ===========================================================
 * Resend OTP Validation
 * ===========================================================
 */

const resendOTPValidator = [
  emailValidation,
];


/**
 * ===========================================================
 * Export Validators
 * ===========================================================
 */

module.exports = {
  sendOTPValidator,
  verifyOTPValidator,
  resendOTPValidator
};