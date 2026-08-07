/**
 * ===========================================================
 * Wishlist Validators
 * ===========================================================
 */

const { body, param } = require("express-validator");

/**
 * ===========================================================
 * Add To Wishlist Validator
 * ===========================================================
 */

const addToWishlistValidator = [
  body("product")
    .notEmpty()
    .withMessage("Product ID is required.")
    .isMongoId()
    .withMessage("Invalid Product ID."),
];

/**
 * ===========================================================
 * Remove From Wishlist Validator
 * ===========================================================
 */

const removeFromWishlistValidator = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required.")
    .isMongoId()
    .withMessage("Invalid Product ID."),
];

module.exports = {
  addToWishlistValidator,
  removeFromWishlistValidator,
};