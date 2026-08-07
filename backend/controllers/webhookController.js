/**
 * ===========================================================
 * Razorpay Webhook Controller
 * ===========================================================
 */

const crypto = require("crypto");

const Payment = require("../models/Payment");
const Order = require("../models/Order");

const webhook = async (req, res) => {

  try {

    const signature =
      req.headers["x-razorpay-signature"];

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_WEBHOOK_SECRET
        )
        .update(
          JSON.stringify(req.body)
        )
        .digest("hex");

    if (signature !== generatedSignature) {

      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature.",
      });

    }

    const event = req.body.event;

    /**
     * Payment Captured
     */

    if (event === "payment.captured") {

      const paymentEntity =
        req.body.payload.payment.entity;

      const payment =
        await Payment.findOne({

          razorpayOrderId:
            paymentEntity.order_id,

        });

      if (payment) {

        payment.status = "Paid";

        payment.razorpayPaymentId =
          paymentEntity.id;

        payment.gatewayResponse =
          paymentEntity;

        payment.paidAt =
          new Date();

        await payment.save();

        await Order.findByIdAndUpdate(
          payment.order,
          {
            paymentStatus: "Paid",
          }
        );

      }

    }

    /**
     * Payment Failed
     */

    if (event === "payment.failed") {

      const paymentEntity =
        req.body.payload.payment.entity;

      const payment =
        await Payment.findOne({

          razorpayOrderId:
            paymentEntity.order_id,

        });

      if (payment) {

        payment.status = "Failed";

        payment.failureReason =
          paymentEntity.error_description;

        payment.gatewayResponse =
          paymentEntity;

        await payment.save();

      }

    }

    return res.status(200).json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
    });

  }

};

module.exports = {
  webhook,
};