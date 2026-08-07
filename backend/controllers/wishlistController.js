/**
 * ===========================================================
 * Wishlist Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");

const wishlistService = require("../services/wishlistService");

/**
 * ===========================================================
 * Add To Wishlist
 * POST /api/wishlist
 * ===========================================================
 */

const addToWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.addToWishlist(
    req.user._id,
    req.body.product
  );

  return res.status(200).json({
    success: true,
    message: "Product added to wishlist successfully.",
    data: wishlist,
  });
});

/**
 * ===========================================================
 * Get Wishlist
 * GET /api/wishlist
 * ===========================================================
 */

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user._id);

  return res.status(200).json({
    success: true,
    data: wishlist,
  });
});

/**
 * ===========================================================
 * Remove From Wishlist
 * DELETE /api/wishlist/:productId
 * ===========================================================
 */

const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.removeFromWishlist(
    req.user._id,
    req.params.productId
  );

  return res.status(200).json({
    success: true,
    message: "Product removed from wishlist successfully.",
    data: wishlist,
  });
});

/**
 * ===========================================================
 * Clear Wishlist
 * DELETE /api/wishlist
 * ===========================================================
 */

const clearWishlist = asyncHandler(async (req, res) => {
  await wishlistService.clearWishlist(req.user._id);

  return res.status(200).json({
    success: true,
    message: "Wishlist cleared successfully.",
  });
});

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};