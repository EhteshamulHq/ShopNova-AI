/**
 * ===========================================================
 * Webhook Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const {
  webhook,
} = require("../controllers/webhookController");

// Razorpay Webhook
router.post(
  "/razorpay",
  webhook
);

module.exports = router;