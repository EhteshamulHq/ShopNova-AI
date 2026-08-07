/**
 * ===========================================================
 * Cart Validators
 * ===========================================================
 */

const { body, param } = require("express-validator");

/**
 * ===========================================================
 * Add To Cart Validator
 * ===========================================================
 */

const addToCartValidator = [
  body("product")
    .notEmpty()
    .withMessage("Product ID is required.")
    .isMongoId()
    .withMessage("Invalid Product ID."),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
];

/**
 * ===========================================================
 * Update Cart Quantity Validator
 * ===========================================================
 */

const updateCartValidator = [
  param("productId")
    .isMongoId()
    .withMessage("Invalid Product ID."),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
];

/**
 * ===========================================================
 * Remove Item Validator
 * ===========================================================
 */

const removeCartItemValidator = [
  param("productId")
    .isMongoId()
    .withMessage("Invalid Product ID."),
];

module.exports = {
  addToCartValidator,
  updateCartValidator,
  removeCartItemValidator,
};