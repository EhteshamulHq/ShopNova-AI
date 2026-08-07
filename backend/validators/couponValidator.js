/**
 * ===========================================================
 * Coupon Validators
 * ===========================================================
 */

const { body, param } = require("express-validator");

/**
 * ===========================================================
 * Create Coupon Validator
 * ===========================================================
 */

const createCouponValidator = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required.")
    .isLength({ min: 3, max: 30 })
    .withMessage("Coupon code must be between 3 and 30 characters."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description cannot exceed 300 characters."),

  body("discountType")
    .notEmpty()
    .withMessage("Discount type is required.")
    .isIn(["percentage", "fixed"])
    .withMessage("Discount type must be percentage or fixed."),

  body("discountValue")
    .notEmpty()
    .withMessage("Discount value is required.")
    .isFloat({ gt: 0 })
    .withMessage("Discount value must be greater than 0."),

  body("minimumOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum order amount cannot be negative."),

  body("maximumDiscount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum discount cannot be negative."),

  body("usageLimit")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Usage limit cannot be negative."),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Invalid start date."),

  body("expiryDate")
    .notEmpty()
    .withMessage("Expiry date is required.")
    .isISO8601()
    .withMessage("Invalid expiry date."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/**
 * ===========================================================
 * Update Coupon Validator
 * ===========================================================
 */

const updateCouponValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid coupon ID."),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 }),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 300 }),

  body("discountType")
    .optional()
    .isIn(["percentage", "fixed"]),

  body("discountValue")
    .optional()
    .isFloat({ gt: 0 }),

  body("minimumOrderAmount")
    .optional()
    .isFloat({ min: 0 }),

  body("maximumDiscount")
    .optional()
    .isFloat({ min: 0 }),

  body("usageLimit")
    .optional()
    .isInt({ min: 0 }),

  body("startDate")
    .optional()
    .isISO8601(),

  body("expiryDate")
    .optional()
    .isISO8601(),

  body("isActive")
    .optional()
    .isBoolean(),
];

/**
 * ===========================================================
 * Coupon ID Validator
 * ===========================================================
 */

const couponIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid coupon ID."),
];

/**
 * ===========================================================
 * Apply Coupon Validator
 * ===========================================================
 */

const applyCouponValidator = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required."),
];

module.exports = {
  createCouponValidator,
  updateCouponValidator,
  couponIdValidator,
  applyCouponValidator,
};