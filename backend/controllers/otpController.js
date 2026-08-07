/**
 * ===========================================================
 * OTP Controller
 * ===========================================================
 * Responsibilities:
 * - Send OTP
 * - Verify OTP
 * - Resend OTP
 * ===========================================================
 */

const User = require("../models/User");

const {
  sendVerificationOTP,
  verifyOTP: verifyOTPService,
} = require("../services/otpService");

/**
 * ==========================================
 * Send OTP
 * POST /api/auth/send-otp
 * ==========================================
 */
const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified.",
      });
    }

    await sendVerificationOTP(user);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ==========================================
 * Verify OTP
 * POST /api/auth/verify-otp
 * ==========================================
 */
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    await verifyOTPService(email, otp);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ==========================================
 * Resend OTP
 * POST /api/auth/resend-otp
 * ==========================================
 */
const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified.",
      });
    }

    await sendVerificationOTP(user);

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  resendOTP,
};