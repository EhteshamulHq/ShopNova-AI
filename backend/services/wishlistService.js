/**
 * ===========================================================
 * Wishlist Service
 * ===========================================================
 */

const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

/**
 * ===========================================================
 * Add To Wishlist
 * ===========================================================
 */

const addToWishlist = async (userId, productId) => {
  const product = await Product.findOne({
    _id: productId,
    status: "active",
  });

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [],
    });
  }

  const exists = wishlist.products.some(
    (id) => id.toString() === productId
  );

  if (exists) {
    throw new AppError(
      "Product already exists in wishlist.",
      409
    );
  }

  wishlist.products.push(product._id);

  await wishlist.save();

  return wishlist.populate("products");
};

/**
 * ===========================================================
 * Get Wishlist
 * ===========================================================
 */

const getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  }).populate("products");

  if (!wishlist) {
    return {
      products: [],
    };
  }

  // Remove deleted products automatically
  wishlist.products = wishlist.products.filter(
    (product) => product !== null
  );

  await wishlist.save();

  return wishlist;
};

/**
 * ===========================================================
 * Remove From Wishlist
 * ===========================================================
 */

const removeFromWishlist = async (
  userId,
  productId
) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    throw new AppError("Wishlist not found.", 404);
  }

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId
  );

  await wishlist.save();

  return wishlist.populate("products");
};

/**
 * ===========================================================
 * Clear Wishlist
 * ===========================================================
 */

const clearWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
  });

  if (!wishlist) {
    throw new AppError("Wishlist not found.", 404);
  }

  wishlist.products = [];

  await wishlist.save();

  return wishlist;
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
};