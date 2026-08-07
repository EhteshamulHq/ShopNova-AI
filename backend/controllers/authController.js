/**
 * ===========================================================
 * Authentication Controller
 * ===========================================================
 */

const authService = require("../services/authService");
const { sendVerificationOTP } = require("../services/otpService");
const asyncHandler = require("../utils/asyncHandler");

/**
 * ===========================================================
 * Register User
 * POST /api/auth/register
 * ===========================================================
 */

const register = asyncHandler(async (req, res) => {

  const user =
    await authService.registerUser(req.body);

  await sendVerificationOTP(user);

  res.status(201).json({
    success: true,
    message:
      "Registration successful. Please verify your email.",
  });

}); 

/**
 * ===========================================================
 * Login User
 * ===========================================================
 */

const login = asyncHandler(async (req, res) => {
  const { token, user } =
    await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

/**
 * ===========================================================
 * Change Password
 * PUT /api/auth/change-password
 * ===========================================================
 */

const changePassword = asyncHandler(async (req, res) => {

  await authService.changePassword({
    userId: req.user._id,
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  });

  res.status(200).json({
    success: true,
    message: "Password changed successfully.",
  });

});

/**
 * ===========================================================
 * Forgot Password
 * ===========================================================
 */

const forgotPassword = asyncHandler(async (req, res) => {

  await authService.forgotPassword(req.body);

  res.status(200).json({
    success: true,
    message: "Password reset email sent.",
  });

});

/**
 * ===========================================================
 * Reset Password
 * ===========================================================
 */

const resetPassword = asyncHandler(async (req, res) => {

  await authService.resetPassword({
    token: req.params.token,
    password: req.body.password,
  });

  res.status(200).json({
    success: true,
    message: "Password reset successful.",
  });

});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};