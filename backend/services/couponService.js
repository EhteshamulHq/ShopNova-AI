/**
 * ===========================================================
 * Coupon Service
 * ===========================================================
 */

const Coupon = require("../models/Coupon");
const Cart = require("../models/Cart");
const AppError = require("../utils/AppError");

/**
 * ===========================================================
 * Create Coupon
 * ===========================================================
 */

const createCoupon = async (userId, data) => {
  const exists = await Coupon.findOne({
    code: data.code.toUpperCase(),
  });

  if (exists) {
    throw new AppError("Coupon already exists.", 409);
  }

  const coupon = await Coupon.create({
    ...data,
    code: data.code.toUpperCase(),
    createdBy: userId,
  });

  return coupon;
};

/**
 * ===========================================================
 * Get All Coupons
 * ===========================================================
 */

const getCoupons = async () => {
  return Coupon.find().sort({
    createdAt: -1,
  });
};

/**
 * ===========================================================
 * Get Coupon By ID
 * ===========================================================
 */

const getCouponById = async (id) => {
  const coupon = await Coupon.findById(id);

  if (!coupon) {
    throw new AppError("Coupon not found.", 404);
  }

  return coupon;
};

/**
 * ===========================================================
 * Update Coupon
 * ===========================================================
 */

const updateCoupon = async (id, data) => {
  if (data.code) {
    data.code = data.code.toUpperCase();
  }

  const coupon = await Coupon.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!coupon) {
    throw new AppError("Coupon not found.", 404);
  }

  return coupon;
};

/**
 * ===========================================================
 * Delete Coupon
 * ===========================================================
 */

const deleteCoupon = async (id) => {
  const coupon = await Coupon.findById(id);

  if (!coupon) {
    throw new AppError("Coupon not found.", 404);
  }

  await coupon.deleteOne();
};

/**
 * ===========================================================
 * Apply Coupon
 * ===========================================================
 */

const applyCoupon = async (userId, code) => {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!coupon) {
    throw new AppError("Invalid coupon code.", 404);
  }

  const now = new Date();

  if (now < coupon.startDate) {
    throw new AppError(
      "Coupon is not active yet.",
      400
    );
  }

  if (now > coupon.expiryDate) {
    throw new AppError(
      "Coupon has expired.",
      400
    );
  }

  if (
    coupon.usageLimit > 0 &&
    coupon.usedCount >= coupon.usageLimit
  ) {
    throw new AppError(
      "Coupon usage limit exceeded.",
      400
    );
  }

  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart || cart.items.length === 0) {
    throw new AppError(
      "Your cart is empty.",
      400
    );
  }

  if (
    cart.subtotal <
    coupon.minimumOrderAmount
  ) {
    throw new AppError(
      `Minimum order amount is ₹${coupon.minimumOrderAmount}.`,
      400
    );
  }

  let discount = 0;

  if (coupon.discountType === "fixed") {
    discount = coupon.discountValue;
  } else {
    discount =
      (cart.subtotal * coupon.discountValue) /
      100;

    if (
      coupon.maximumDiscount > 0 &&
      discount > coupon.maximumDiscount
    ) {
      discount = coupon.maximumDiscount;
    }
  }

  const finalAmount = Math.max(
    0,
    cart.subtotal - discount
  );

  return {
    coupon,
    subtotal: cart.subtotal,
    discount,
    finalAmount,
  };
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};