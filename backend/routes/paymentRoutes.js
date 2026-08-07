/**
 * ===========================================================
 * Payment Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

const {
  createPaymentValidator,
  verifyPaymentValidator,
  retryPaymentValidator,
  refundPaymentValidator,
  paymentIdValidator,
} = require("../validators/paymentValidator");

const validateRequest = require("../middleware/validateRequest");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

/**
 * ===========================================================
 * Payment Routes
 * ===========================================================
 */

// Create Razorpay Order
router.post(
  "/create-order",
  protect,
  createPaymentValidator,
  validateRequest,
  paymentController.createRazorpayOrder
);

// Verify Payment
router.post(
  "/verify",
  protect,
  verifyPaymentValidator,
  validateRequest,
  paymentController.verifyPayment
);

// Retry Payment
router.post(
  "/retry/:orderId",
  protect,
  retryPaymentValidator,
  validateRequest,
  paymentController.retryPayment
);

// Refund Payment (Admin)
router.post(
  "/refund/:paymentId",
  protect,
  authorize("admin"),
  refundPaymentValidator,
  validateRequest,
  paymentController.refundPayment
);

// Get Payment Details
router.get(
  "/:id",
  protect,
  paymentIdValidator,
  validateRequest,
  paymentController.getPaymentById
);

module.exports = router;