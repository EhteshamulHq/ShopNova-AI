/**
 * ===========================================================
 * Order Validators
 * ===========================================================
 */

const { body, param } = require("express-validator");

/**
 * ===========================================================
 * Place Order Validator
 * ===========================================================
 */

const placeOrderValidator = [
  body("addressId")
    .notEmpty()
    .withMessage("Address ID is required.")
    .isMongoId()
    .withMessage("Invalid address ID."),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required.")
    .isIn(["COD", "RAZORPAY", "STRIPE"])
    .withMessage("Invalid payment method."),

  body("couponCode")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Invalid coupon code."),
];

/**
 * ===========================================================
 * Buy Now Validator
 * ===========================================================
 */

const buyNowValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required.")
    .isMongoId()
    .withMessage("Invalid product ID."),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),

  body("addressId")
    .notEmpty()
    .withMessage("Address ID is required.")
    .isMongoId()
    .withMessage("Invalid address ID."),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required.")
    .isIn(["COD", "RAZORPAY", "STRIPE"])
    .withMessage("Invalid payment method."),

  body("couponCode")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Invalid coupon code."),
];

/**
 * ===========================================================
 * Order ID Validator
 * ===========================================================
 */

const orderIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid order ID."),
];

/**
 * ===========================================================
 * Cancel Order Validator
 * ===========================================================
 */

const cancelOrderValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid order ID."),
];

/**
 * ===========================================================
 * Update Order Status Validator
 * ===========================================================
 */

const updateOrderStatusValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid order ID."),

  body("orderStatus")
    .notEmpty()
    .withMessage("Order status is required.")
    .isIn([
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Out For Delivery",
      "Delivered",
      "Cancelled",
      "Returned",
    ])
    .withMessage("Invalid order status."),
];

module.exports = {
  placeOrderValidator,
  buyNowValidator,
  orderIdValidator,
  cancelOrderValidator,
  updateOrderStatusValidator,
};