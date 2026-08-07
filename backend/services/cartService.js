/**
 * ===========================================================
 * Cart Service
 * ===========================================================
 */

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

/**
 * ===========================================================
 * Recalculate Cart
 * ===========================================================
 */

const recalculateCart = (cart) => {
  let totalItems = 0;
  let totalQuantity = 0;
  let subtotal = 0;

  cart.items.forEach((item) => {
    item.subtotal = item.price * item.quantity;

    totalQuantity += item.quantity;
    subtotal += item.subtotal;
  });

cart.items = cart.items.filter((item) => item.quantity > 0);

totalItems = cart.items.length;

  cart.totalItems = totalItems;
  cart.totalQuantity = totalQuantity;
  cart.subtotal = subtotal;
};

/**
 * ===========================================================
 * Add To Cart
 * ===========================================================
 */

const addToCart = async (userId, data) => {
  const { product: productId, quantity = 1 } = data;

  const product = await Product.findOne({
  _id: productId,
  status: "active",
});

  if (!product) {
    throw new AppError("Product not found.", 404);
  }


  if (product.stock < quantity) {
    throw new AppError("Insufficient stock.", 400);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;

    if (existingItem.quantity > product.stock) {
      throw new AppError("Stock limit exceeded.", 400);
    }

    existingItem.price = product.price;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price,
      subtotal: product.price * quantity,
    });
  }

  recalculateCart(cart);

  await cart.save();

  return cart.populate("items.product");
};

/**
 * ===========================================================
 * Get Cart
 * ===========================================================
 */

const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate("items.product");

  if (!cart) {
    return {
      items: [],
      totalItems: 0,
      totalQuantity: 0,
      subtotal: 0,
    };
  }

  let cartChanged = false;

  for (const item of cart.items) {
    // Product deleted
    if (!item.product) {
      cart.items = cart.items.filter(
        (cartItem) => cartItem.product
      );
      cartChanged = true;
      continue;
    }

    // Price changed
    if (item.price !== item.product.price) {
      item.price = item.product.price;
      cartChanged = true;
    }

    // Stock reduced
    if (item.quantity > item.product.stock) {
      item.quantity = item.product.stock;

      if (item.quantity < 1) {
        item.quantity = 1;
      }

      cartChanged = true;
    }
  }

  recalculateCart(cart);

  if (cartChanged) {
    await cart.save();
  }

  return cart;
};

/**
 * ===========================================================
 * Update Cart Item Quantity
 * ===========================================================
 */

const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new AppError("Cart not found.", 404);
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    throw new AppError("Product not found in cart.", 404);
  }

const product = await Product.findOne({
  _id: productId,
  status: "active",
});

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  if (quantity > product.stock) {
    throw new AppError("Insufficient stock.", 400);
  }

  item.quantity = quantity;
  item.price = product.price;

  recalculateCart(cart);

  await cart.save();

  return cart.populate("items.product");
};

/**
 * ===========================================================
 * Remove Cart Item
 * ===========================================================
 */

const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new AppError("Cart not found.", 404);
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  recalculateCart(cart);

  await cart.save();

  return cart.populate("items.product");
};

/**
 * ===========================================================
 * Clear Cart
 * ===========================================================
 */

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new AppError("Cart not found.", 404);
  }

  cart.items = [];
  cart.totalItems = 0;
  cart.totalQuantity = 0;
  cart.subtotal = 0;

  await cart.save();

  return cart;
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};