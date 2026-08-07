/**
 * ===========================================================
 * Payment Validators
 * ===========================================================
 */

const { body, param } = require("express-validator");

/**
 * ===========================================================
 * Create Razorpay Order
 * ===========================================================
 */

const createPaymentValidator = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required.")
    .isMongoId()
    .withMessage("Invalid order ID."),
];

/**
 * ===========================================================
 * Verify Razorpay Payment
 * ===========================================================
 */

const verifyPaymentValidator = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required.")
    .isMongoId()
    .withMessage("Invalid order ID."),

  body("razorpay_order_id")
    .notEmpty()
    .withMessage("Razorpay Order ID is required."),

  body("razorpay_payment_id")
    .notEmpty()
    .withMessage("Razorpay Payment ID is required."),

  body("razorpay_signature")
    .notEmpty()
    .withMessage("Razorpay Signature is required."),
];

/**
 * ===========================================================
 * Retry Payment
 * ===========================================================
 */

const retryPaymentValidator = [
  param("orderId")
    .isMongoId()
    .withMessage("Invalid order ID."),
];

/**
 * ===========================================================
 * Refund Payment
 * ===========================================================
 */

const refundPaymentValidator = [
  param("paymentId")
    .isMongoId()
    .withMessage("Invalid payment ID."),
];

/**
 * ===========================================================
 * Payment ID Validator
 * ===========================================================
 */

const paymentIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid payment ID."),
];

module.exports = {
  createPaymentValidator,
  verifyPaymentValidator,
  retryPaymentValidator,
  refundPaymentValidator,
  paymentIdValidator,
};