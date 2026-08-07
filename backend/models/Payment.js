/**
 * ===========================================================
 * Payment Model
 * ===========================================================
 */

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: [
        "COD",
        "RAZORPAY",
        "STRIPE",
      ],
      required: true,
    },

    provider: {
      type: String,
      enum: [
        "RAZORPAY",
        "STRIPE",
        "COD",
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: [
        "Created",
        "Pending",
        "Paid",
        "Failed",
        "Refunded",
      ],
      default: "Created",
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,

    razorpaySignature: String,

    transactionId: String,

    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    paidAt: Date,

    failureReason: String,

    refundedAt: Date,

    refundAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);