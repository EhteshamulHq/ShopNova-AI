/**
 * ===========================================================
 * Order Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

const {
  placeOrderValidator,
  buyNowValidator,
  orderIdValidator,
  cancelOrderValidator,
  updateOrderStatusValidator,
} = require("../validators/orderValidator");

const validateRequest = require("../middleware/validateRequest");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Admin - Get All Orders
router.get(
  "/admin",
  protect,
  authorize("admin"),
  orderController.getAllOrders
);

// My Orders
router.get(
  "/my-orders",
  protect,
  orderController.getMyOrders
);

// Download Invoice
router.get(
  "/:id/invoice",
  protect,
  orderIdValidator,
  validateRequest,
  orderController.downloadInvoice
);

// Get Order By ID
router.get(
  "/:id",
  protect,
  orderIdValidator,
  validateRequest,
  orderController.getOrderById
);

// Cancel Order
router.patch(
  "/:id/cancel",
  protect,
  cancelOrderValidator,
  validateRequest,
  orderController.cancelOrder
);

// Update Order Status (Admin)
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateOrderStatusValidator,
  validateRequest,
  orderController.updateOrderStatus
);

// Buy Now
router.post(
  "/buy-now",
  protect,
  buyNowValidator,
  validateRequest,
  orderController.buyNow
);

/**
 * ===========================================================
 * User Routes
 * ===========================================================
 */

// Place Order
router.post(
  "/",
  protect,
  placeOrderValidator,
  validateRequest,
  orderController.placeOrder
);

module.exports = router;