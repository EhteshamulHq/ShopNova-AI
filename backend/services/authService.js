/**
 * ===========================================================
 * Authentication Service
 * ===========================================================
 * Purpose:
 * Contains all authentication business logic.
 *
 * Responsibilities:
 * - Register new users
 * - Validate login credentials
 * - Generate JWT tokens
 * ===========================================================
 */

const User = require("../models/User");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");

const { sendEmail } = require("./emailService");

const welcomeEmail = require("../mailTemplates/welcomeEmail");
const resetPasswordEmail = require("../mailTemplates/resetPasswordEmail");
const passwordChangedEmail = require("../mailTemplates/passwordChangedEmail");


/**
 * ===========================================================
 * Register User
 * ===========================================================
 */
const registerUser = async ({ name, email, password }) => {
  // Check required fields
  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  // Create new user
  // Password hashing is handled automatically
  // by User model pre("save") middleware
  const user = await User.create({
    name,
    email,
    password,
  });
  // Send Welcome Email
await sendEmail({
  to: user.email,
  subject: "Welcome to ShopNova AI",
  html: welcomeEmail(user.name),
});

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
};

/**
 * ===========================================================
 * Login User
 * ===========================================================
 */
const loginUser = async ({ email, password }) => {
  // Check required fields
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  // Find user and include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  /**
   * Email Verification Check
   */
  if (!user.isVerified) {
    throw new Error("Please verify your email before logging in.");
  }

  // Generate JWT
  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  };
};

/**
 * ===========================================================
 * Change Password
 * ===========================================================
 */
const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {

  // Find user with password
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new Error("User not found.");
  }

  // Verify current password
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new Error("Current password is incorrect.");
  }

  // Prevent using same password
  const isSamePassword = await user.comparePassword(newPassword);

  if (isSamePassword) {
    throw new Error(
      "New password cannot be the same as current password."
    );
  }

  // Update password
  user.password = newPassword;

  // Save (password will be hashed automatically)
  await user.save();

  // Send confirmation email
  await sendEmail({
    to: user.email,
    subject: "Password Changed Successfully",
    html: passwordChangedEmail(user.name),
  });

  return true;

};

/**
 * ===========================================================
 * Forgot Password
 * ===========================================================
 */
const forgotPassword = async ({ email }) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire =
    Date.now() + 15 * 60 * 1000;

 await user.save({
  validateBeforeSave: false,
});

  const resetUrl =
`${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    html: resetPasswordEmail(resetUrl),
  });

  return true;

};

/**
 * ===========================================================
 * Reset Password
 * ===========================================================
 */

const resetPassword = async ({
  token,
  password,
}) => {

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  }).select("+password");

  if (!user) {
    throw new Error("Invalid or expired token.");
  }

  user.password = password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Password Changed",
    html: passwordChangedEmail(
      user.name
    ),
  });

  return true;

};

/**
 * ===========================================================
 * Export Services
 * ===========================================================
 */
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
};