/**
 * ===========================================================
 * Address Validators
 * ===========================================================
 */

const { body, param } = require("express-validator");

/**
 * ===========================================================
 * Add Address Validator
 * ===========================================================
 */

const addAddressValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Full name must be between 3 and 100 characters."),

  body("mobileNumber")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required.")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid mobile number."),

  body("alternateMobileNumber")
    .optional({ values: "falsy" })
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid alternate mobile number."),

  body("addressLine1")
    .trim()
    .notEmpty()
    .withMessage("Address Line 1 is required.")
    .isLength({ min: 5, max: 200 })
    .withMessage("Address Line 1 must be between 5 and 200 characters."),

  body("addressLine2")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Address Line 2 cannot exceed 200 characters."),

  body("landmark")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Landmark cannot exceed 100 characters."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),

  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required."),

  body("country")
    .optional()
    .trim(),

  body("postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required.")
    .matches(/^\d{6}$/)
    .withMessage("Postal code must be 6 digits."),

  body("addressType")
    .optional()
    .isIn(["Home", "Office", "Other"])
    .withMessage("Invalid address type."),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be true or false."),
];

/**
 * ===========================================================
 * Update Address Validator
 * ===========================================================
 */

const updateAddressValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid address ID."),

  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }),

  body("mobileNumber")
    .optional()
    .matches(/^[6-9]\d{9}$/),

  body("alternateMobileNumber")
    .optional({ values: "falsy" })
    .matches(/^[6-9]\d{9}$/),

  body("addressLine1")
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 }),

  body("addressLine2")
    .optional()
    .trim()
    .isLength({ max: 200 }),

  body("landmark")
    .optional()
    .trim()
    .isLength({ max: 100 }),

  body("city")
    .optional()
    .trim(),

  body("state")
    .optional()
    .trim(),

  body("country")
    .optional()
    .trim(),

  body("postalCode")
    .optional()
    .matches(/^\d{6}$/),

  body("addressType")
    .optional()
    .isIn(["Home", "Office", "Other"]),

  body("isDefault")
    .optional()
    .isBoolean(),
];

/**
 * ===========================================================
 * Address ID Validator
 * ===========================================================
 */

const addressIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid address ID."),
];

module.exports = {
  addAddressValidator,
  updateAddressValidator,
  addressIdValidator,
};