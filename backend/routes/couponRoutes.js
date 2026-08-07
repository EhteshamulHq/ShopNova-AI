/**
 * ===========================================================
 * Coupon Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const couponController = require("../controllers/couponController");

const {
  createCouponValidator,
  updateCouponValidator,
  couponIdValidator,
  applyCouponValidator,
} = require("../validators/couponValidator");

const validateRequest = require("../middleware/validateRequest");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

/**
 * ===========================================================
 * Public Routes
 * ===========================================================
 */

// Get All Coupons
router.get(
  "/",
  couponController.getCoupons
);

// Get Coupon By ID
router.get(
  "/:id",
  couponIdValidator,
  validateRequest,
  couponController.getCouponById
);

/**
 * ===========================================================
 * User Routes
 * ===========================================================
 */

// Apply Coupon
router.post(
  "/apply",
  protect,
  applyCouponValidator,
  validateRequest,
  couponController.applyCoupon
);

/**
 * ===========================================================
 * Admin Routes
 * ===========================================================
 */

// Create Coupon
router.post(
  "/",
  protect,
  authorize("admin"),
  createCouponValidator,
  validateRequest,
  couponController.createCoupon
);

// Update Coupon
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCouponValidator,
  validateRequest,
  couponController.updateCoupon
);

// Delete Coupon
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  couponIdValidator,
  validateRequest,
  couponController.deleteCoupon
);

module.exports = router;