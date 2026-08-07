/**
 * ===========================================================
 * Cart Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");

const {
  addToCartValidator,
  updateCartValidator,
  removeCartItemValidator,
} = require("../validators/cartValidator");

const validateRequest = require("../middleware/validateRequest");

const {
  protect,
} = require("../middleware/authMiddleware");

/**
 * ===========================================================
 * Cart Routes
 * ===========================================================
 */

// Add Product To Cart
router.post(
  "/",
  protect,
  addToCartValidator,
  validateRequest,
  cartController.addToCart
);

// Get Logged-in User Cart
router.get(
  "/",
  protect,
  cartController.getCart
);

// Update Cart Item Quantity
router.patch(
  "/:productId",
  protect,
  updateCartValidator,
  validateRequest,
  cartController.updateCartItem
);

// Remove Item From Cart
router.delete(
  "/:productId",
  protect,
  removeCartItemValidator,
  validateRequest,
  cartController.removeCartItem
);

// Clear Cart
router.delete(
  "/",
  protect,
  cartController.clearCart
);

module.exports = router;