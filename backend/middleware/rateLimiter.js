/**
 * ===========================================================
 * Rate Limiter Middleware
 * ===========================================================
 * Purpose:
 * Protect APIs from brute-force attacks and abuse.
 *
 * Compatible with:
 * - Express 5
 * - CommonJS
 * ===========================================================
 */

const { rateLimit } = require("express-rate-limit");

/**
 * ===========================================================
 * OTP Send Limiter
 * ===========================================================
 * Max 5 requests every 15 minutes per IP
 */

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 5,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many OTP requests. Please try again after 15 minutes.",
  },
});

/**
 * ===========================================================
 * Login Limiter
 * ===========================================================
 */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 10,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },
});

/**
 * ===========================================================
 * Register Limiter
 * ===========================================================
 */

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,

  limit: 20,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many registration attempts. Please try again later.",
  },
});

module.exports = {
  otpLimiter,
  loginLimiter,
  registerLimiter,
};