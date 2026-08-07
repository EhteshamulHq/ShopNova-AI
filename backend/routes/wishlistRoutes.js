/**
 * ===========================================================
 * Wishlist Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const wishlistController = require("../controllers/wishlistController");

const {
  addToWishlistValidator,
  removeFromWishlistValidator,
} = require("../validators/wishlistValidator");

const validateRequest = require("../middleware/validateRequest");

const {
  protect,
} = require("../middleware/authMiddleware");

/**
 * ===========================================================
 * Wishlist Routes
 * ===========================================================
 */

// Add Product To Wishlist
router.post(
  "/",
  protect,
  addToWishlistValidator,
  validateRequest,
  wishlistController.addToWishlist
);

// Get Logged-in User Wishlist
router.get(
  "/",
  protect,
  wishlistController.getWishlist
);

// Remove Product From Wishlist
router.delete(
  "/:productId",
  protect,
  removeFromWishlistValidator,
  validateRequest,
  wishlistController.removeFromWishlist
);

// Clear Wishlist
router.delete(
  "/",
  protect,
  wishlistController.clearWishlist
);

module.exports = router;