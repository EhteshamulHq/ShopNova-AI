/**
 * ===========================================================
 * Coupon Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");
const couponService = require("../services/couponService");

/**
 * ===========================================================
 * Create Coupon
 * POST /api/coupons
 * Admin
 * ===========================================================
 */

const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await couponService.createCoupon(
    req.user._id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Coupon created successfully.",
    data: coupon,
  });
});

/**
 * ===========================================================
 * Get All Coupons
 * GET /api/coupons
 * ===========================================================
 */

const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await couponService.getCoupons();

  return res.status(200).json({
    success: true,
    data: coupons,
  });
});

/**
 * ===========================================================
 * Get Coupon By ID
 * GET /api/coupons/:id
 * ===========================================================
 */

const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await couponService.getCouponById(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: coupon,
  });
});

/**
 * ===========================================================
 * Update Coupon
 * PUT /api/coupons/:id
 * Admin
 * ===========================================================
 */

const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await couponService.updateCoupon(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Coupon updated successfully.",
    data: coupon,
  });
});

/**
 * ===========================================================
 * Delete Coupon
 * DELETE /api/coupons/:id
 * Admin
 * ===========================================================
 */

const deleteCoupon = asyncHandler(async (req, res) => {
  await couponService.deleteCoupon(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Coupon deleted successfully.",
  });
});

/**
 * ===========================================================
 * Apply Coupon
 * POST /api/coupons/apply
 * ===========================================================
 */

const applyCoupon = asyncHandler(async (req, res) => {
  const result = await couponService.applyCoupon(
    req.user._id,
    req.body.code
  );

  return res.status(200).json({
    success: true,
    message: "Coupon applied successfully.",
    data: result,
  });
});

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};