/**
 * ===========================================================
 * OTP Service
 * ===========================================================
 * Responsibilities:
 * - Generate OTP
 * - Hash OTP
 * - Save OTP
 * - Send Email
 * - Verify OTP
 * - Verify User
 * ===========================================================
 */

const bcrypt = require("bcrypt");

const OTP = require("../models/OTP");
const User = require("../models/User");


const generateOTP = require("../utils/generateOTP");

const { sendEmail } = require("./emailService");

const otpEmail = require("../mailTemplates/otpEmail");

const accountVerifiedEmail = require("../mailTemplates/accountVerifiedEmail");

/**
 * ============================================
 * Send Verification OTP
 * ============================================
 */
const sendVerificationOTP = async (user) => {
  // Remove previous OTP (only one active OTP per user)
  await OTP.deleteMany({
    email: user.email,
  });

  // Generate OTP
  const otp = generateOTP();

  // Hash OTP
  const hashedOTP = await bcrypt.hash(otp, 12);

  // Save OTP
  await OTP.create({
    email: user.email,
    otp: hashedOTP,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });
console.log("Generated OTP:", otp);
console.log("Sending to:", user.email);
await sendEmail({
  to: user.email,
  subject: "Verify Your Email",
  html: otpEmail(otp),
});
console.log("OTP email sent successfully");
  return true;
};

/**
 * ============================================
 * Verify OTP
 * ============================================
 */
const verifyOTP = async (email, otp) => {
  const otpDoc = await OTP.findOne({
    email,
  });

  if (!otpDoc) {
    throw new Error("OTP expired or not found.");
  }

  const matched = await bcrypt.compare(
    otp,
    otpDoc.otp
  );

  if (!matched) {
    throw new Error("Invalid OTP.");
  }

  // Verify User
  const user = await User.findOneAndUpdate(
    {
      email,
    },
    {
      isVerified: true,
    },
    {
      new: true,
    }
  );

  // Delete OTP
  await OTP.deleteOne({
    _id: otpDoc._id,
  });

  // Welcome Email
await sendEmail({
  to: user.email,
  subject: "Account Verified",
  html: accountVerifiedEmail(user.name),
});

  return user;
};

module.exports = {
  sendVerificationOTP,
  verifyOTP,
};