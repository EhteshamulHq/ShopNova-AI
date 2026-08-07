/**
 * ===========================================================
 * Order Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");
const orderService = require("../services/orderService");
const generateInvoice = require("../utils/invoiceGenerator");

/**
 * ===========================================================
 * Place Order
 * POST /api/orders
 * ===========================================================
 */

const placeOrder = asyncHandler(async (req, res) => {

  const order = await orderService.placeOrder(
    req.user._id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Order placed successfully.",
    data: order,
  });

});

/**
 * ===========================================================
 * Get My Orders
 * GET /api/orders/my-orders
 * ===========================================================
 */

const getMyOrders = asyncHandler(async (req, res) => {

  const orders = await orderService.getMyOrders(
    req.user._id
  );

  return res.status(200).json({
    success: true,
    data: orders,
  });

});

/**
 * ===========================================================
 * Get Order By ID
 * GET /api/orders/:id
 * ===========================================================
 */

const getOrderById = asyncHandler(async (req, res) => {

  const order = await orderService.getOrderById(
    req.user._id,
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: order,
  });

});

/**
 * ===========================================================
 * Download Invoice
 * GET /api/orders/:id/invoice
 * ===========================================================
 */

const downloadInvoice = asyncHandler(async (req, res) => {

  const order = await orderService.getOrderById(
    req.params.id,
    req.user._id
  );

  const pdfBuffer = await generateInvoice(order);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition":
      `attachment; filename=invoice-${order.orderNumber}.pdf`,
  });

  return res.send(pdfBuffer);

});

/**
 * ===========================================================
 * Cancel Order
 * DELETE /api/orders/:id/cancel
 * ===========================================================
 */

const cancelOrder = asyncHandler(async (req, res) => {

  const order = await orderService.cancelOrder(
    req.user._id,
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Order cancelled successfully.",
    data: order,
  });

});

/**
 * ===========================================================
 * Get All Orders (Admin)
 * GET /api/orders/admin
 * ===========================================================
 */

const getAllOrders = asyncHandler(async (req, res) => {

  const result = await orderService.getAllOrders(
    req.query
  );

  return res.status(200).json({
    success: true,
    ...result,
  });

});

/**
 * ===========================================================
 * Update Order Status
 * PATCH /api/orders/:id/status
 * ===========================================================
 */

const updateOrderStatus = asyncHandler(async (req, res) => {

  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.orderStatus
  );

  return res.status(200).json({
    success: true,
    message: "Order status updated successfully.",
    data: order,
  });

});

/**
 * ===========================================================
 * Buy Now
 * POST /api/orders/buy-now
 * ===========================================================
 */

const buyNow = asyncHandler(async (req, res) => {

  const order = await orderService.buyNow(
    req.user._id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Order placed successfully.",
    data: order,
  });

});

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders, 
  updateOrderStatus,
  buyNow,
  downloadInvoice,
};