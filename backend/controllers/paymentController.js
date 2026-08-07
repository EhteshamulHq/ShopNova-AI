/**
 * ===========================================================
 * Payment Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");

const paymentService = require("../services/paymentService");

/**
 * ===========================================================
 * Create Razorpay Order
 * POST /api/payments/create-order
 * ===========================================================
 */

const createRazorpayOrder = asyncHandler(async (req, res) => {

  const result =
    await paymentService.createRazorpayOrder(
      req.user._id,
      req.body.orderId
    );

  return res.status(201).json({
    success: true,
    message: "Razorpay order created successfully.",
    data: result,
  });

});

/**
 * ===========================================================
 * Verify Payment
 * POST /api/payments/verify
 * ===========================================================
 */

const verifyPayment = asyncHandler(async (req, res) => {

  const payment =
    await paymentService.verifyPayment(
      req.user._id,
      req.body
    );

  return res.status(200).json({
    success: true,
    message: "Payment verified successfully.",
    data: payment,
  });

});

/**
 * ===========================================================
 * Retry Payment
 * POST /api/payments/retry/:orderId
 * ===========================================================
 */

const retryPayment = asyncHandler(async (req, res) => {

  const result =
    await paymentService.retryPayment(
      req.user._id,
      req.params.orderId
    );

  return res.status(200).json({
    success: true,
    message: "Retry payment order created.",
    data: result,
  });

});

/**
 * ===========================================================
 * Get Payment Details
 * GET /api/payments/:id
 * ===========================================================
 */

const getPaymentById = asyncHandler(async (req, res) => {

  const payment =
    await paymentService.getPaymentById(
      req.user._id,
      req.params.id
    );

  return res.status(200).json({
    success: true,
    data: payment,
  });

});

/**
 * ===========================================================
 * Refund Payment
 * POST /api/payments/refund/:paymentId
 * ===========================================================
 */

const refundPayment = asyncHandler(async (req, res) => {

  const payment =
    await paymentService.refundPayment(
      req.params.paymentId
    );

  return res.status(200).json({
    success: true,
    message: "Payment refunded successfully.",
    data: payment,
  });

});

module.exports = {
  createRazorpayOrder,
  verifyPayment,
  retryPayment,
  getPaymentById,
  refundPayment,
};