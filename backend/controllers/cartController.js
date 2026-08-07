/**
 * ===========================================================
 * Cart Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");
const cartService = require("../services/cartService");

/**
 * ===========================================================
 * Add To Cart
 * POST /api/cart
 * ===========================================================
 */
const addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req.user._id, req.body);

  return res.status(200).json({
    success: true,
    message: "Product added to cart successfully.",
    data: cart,
  });
});

/**
 * ===========================================================
 * Get User Cart
 * GET /api/cart
 * ===========================================================
 */
const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);

  return res.status(200).json({
    success: true,
    data: cart,
  });
});

/**
 * ===========================================================
 * Update Cart Item Quantity
 * PATCH /api/cart/:productId
 * ===========================================================
 */
const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateCartItem(
    req.user._id,
    req.params.productId,
    req.body.quantity
  );

  return res.status(200).json({
    success: true,
    message: "Cart updated successfully.",
    data: cart,
  });
});

/**
 * ===========================================================
 * Remove Cart Item
 * DELETE /api/cart/:productId
 * ===========================================================
 */
const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeCartItem(
    req.user._id,
    req.params.productId
  );

  return res.status(200).json({
    success: true,
    message: "Item removed from cart.",
    data: cart,
  });
});

/**
 * ===========================================================
 * Clear Cart
 * DELETE /api/cart
 * ===========================================================
 */
const clearCart = asyncHandler(async (req, res) => {
  await cartService.clearCart(req.user._id);

  return res.status(200).json({
    success: true,
    message: "Cart cleared successfully.",
  });
});

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};