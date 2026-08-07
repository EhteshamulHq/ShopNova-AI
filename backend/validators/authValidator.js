/**
 * ===========================================================
 * Authentication Validator
 * ===========================================================
 * Purpose:
 * Validate incoming authentication requests using
 * Express Validator.
 *
 * Why?
 * - Prevent invalid data from reaching the database.
 * - Improve security.
 * - Return meaningful validation errors.
 * ===========================================================
 */

const { body, validationResult } = require("express-validator");

/**
 * ===========================================================
 * Register Validation Rules
 * ===========================================================
 */
const registerValidator = [
  // Validate Name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters."),

  // Validate Email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

  // Validate Password
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),
];

/**
 * ===========================================================
 * Login Validation Rules
 * ===========================================================
 */
const loginValidator = [
  // Validate Email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),

  // Validate Password
  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];

/**
 * ===========================================================
 * Forgot Password Validator
 * ===========================================================
 */

const forgotPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
];


/**
 * ===========================================================
 * Reset Password Validator
 * ===========================================================
 */

const resetPasswordValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
];

/**
 * ===========================================================
 * Change Password Validator
 * ===========================================================
 */

const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error(
          "New password cannot be the same as current password"
        );
      }
      return true;
    }),
];


/**
 * Export Validators
 */
module.exports = {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
};