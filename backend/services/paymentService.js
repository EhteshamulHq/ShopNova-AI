/**
 * ===========================================================
 * Payment Service
 * ===========================================================
 */

const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Payment = require("../models/Payment");
const Order = require("../models/Order");

const User = require("../models/User");
const {
  createNotification,
} = require("./notificationService");

const { sendEmail } = require("./emailService");

const paymentSuccessEmail = require("../mailTemplates/paymentSuccessEmail");

const paymentFailedEmail = require("../mailTemplates/paymentFailedEmail");

const refundEmail = require("../mailTemplates/refundEmail");

const AppError = require("../utils/AppError");

/**
 * ===========================================================
 * Create Razorpay Order
 * ===========================================================
 */

const createRazorpayOrder = async (userId, orderId) => {

  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new AppError(
      "Order not found.",
      404
    );
  }

  if (order.paymentMethod !== "RAZORPAY") {
    throw new AppError(
      "This order is not a Razorpay order.",
      400
    );
  }

  if (order.paymentStatus === "Paid") {
    throw new AppError(
      "Order already paid.",
      400
    );
  }

  const razorpayOrder = await razorpay.orders.create({

    amount: Math.round(order.totalAmount * 100),

    currency: "INR",

    receipt: order.orderNumber,
  });

  const payment = await Payment.create({

    order: order._id,

    user: userId,

    paymentMethod: "RAZORPAY",

    provider: "RAZORPAY",

    amount: order.totalAmount,

    razorpayOrderId: razorpayOrder.id,

    status: "Created",
  });

  return {

    payment,

    razorpayOrder,
  };

};

/**
 * ===========================================================
 * Verify Razorpay Payment
 * ===========================================================
 */

const verifyPayment = async (
  userId,
  data
) => {

  const generatedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${data.razorpay_order_id}|${data.razorpay_payment_id}`
      )
      .digest("hex");

  if (
    generatedSignature !==
    data.razorpay_signature
  ) {
    throw new AppError(
      "Payment verification failed.",
      400
    );
  }

  const payment =
    await Payment.findOne({

      razorpayOrderId:
        data.razorpay_order_id,

      user: userId,
    });

  if (!payment) {
    throw new AppError(
      "Payment not found.",
      404
    );
  }

  payment.status = "Paid";

  payment.razorpayPaymentId =
    data.razorpay_payment_id;

  payment.razorpaySignature =
    data.razorpay_signature;

  payment.paidAt = new Date();

  await payment.save();
  

  const order =
    await Order.findById(payment.order);

  order.paymentStatus = "Paid";

  await order.save();

  await createNotification({
  user: order.user,
  title: "Payment Successful",
  message: `Payment received for Order #${order.orderNumber}.`,
  type: "payment",
});

  return payment;

};

/**
 * ===========================================================
 * Retry Payment
 * ===========================================================
 */

const retryPayment = async (
  userId,
  orderId
) => {

  return createRazorpayOrder(
    userId,
    orderId
  );

};

/**
 * ===========================================================
 * Get Payment
 * ===========================================================
 */

const getPaymentById = async (
  userId,
  paymentId
) => {

  const payment =
    await Payment.findOne({

      _id: paymentId,

      user: userId,
    }).populate(
      "order"
    );

  if (!payment) {
    throw new AppError(
      "Payment not found.",
      404
    );
  }

  return payment;

};

/**
 * ===========================================================
 * Refund Payment
 * ===========================================================
 */

const refundPayment = async (paymentId) => {

  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new AppError(
      "Payment not found.",
      404
    );
  }

  if (payment.status !== "Paid") {
    throw new AppError(
      "Only paid payments can be refunded.",
      400
    );
  }

  const refund = await razorpay.payments.refund(
    payment.razorpayPaymentId,
    {
      amount: Math.round(payment.amount * 100),
    }
  );

  payment.status = "Refunded";
  payment.refundAmount = payment.amount;
  payment.refundedAt = new Date();
  payment.gatewayResponse = refund;

  await payment.save();

  await createNotification({
  user: order.user,
  title: "Refund Processed",
  message: `Refund has been processed for Order #${order.orderNumber}.`,
  type: "refund",
});

  await Order.findByIdAndUpdate(
    payment.order,
    {
      paymentStatus: "Refunded",
      orderStatus: "Cancelled",
    }
  );

  return payment;

};

module.exports = {

  createRazorpayOrder,
  verifyPayment,
  retryPayment,
  getPaymentById,
  refundPayment,

};