/**
 * ===========================================================
 * ShopNova AI
 * File: src/api/auth.api.js
 * Purpose:
 * Authentication API Layer
 *
 * Backend APIs:
 * POST /api/auth/register
 * POST /api/auth/login
 * POST /api/auth/send-otp
 * POST /api/auth/verify-otp
 * POST /api/auth/forgot-password
 * POST /api/auth/reset-password
 * GET  /api/auth/profile
 * PUT  /api/auth/profile
 * PUT  /api/auth/change-password
 * DELETE /api/auth/delete-account
 * ===========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const authApi = {
  register(data) {
    return api.post(ENDPOINTS.AUTH.REGISTER, data);
  },

  login(data) {
    return api.post(ENDPOINTS.AUTH.LOGIN, data);
  },

  sendOtp(data) {
    return api.post(ENDPOINTS.AUTH.SEND_OTP, data);
  },
  resendOtp(data) {
    return api.post(ENDPOINTS.AUTH.RESEND_OTP, data);
  },

  verifyOtp(data) {
    return api.post(ENDPOINTS.AUTH.VERIFY_OTP, data);
  },

  forgotPassword(data) {
    return api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  resetPassword(token, data) {
    return api.post(ENDPOINTS.AUTH.RESET_PASSWORD(token), data);
  },

  getProfile() {
    return api.get(ENDPOINTS.AUTH.PROFILE);
  },

  updateProfile(data) {
    return api.put(ENDPOINTS.AUTH.PROFILE, data);
  },

  changePassword(data) {
    return api.put(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  deleteAccount() {
    return api.delete(ENDPOINTS.AUTH.DELETE_ACCOUNT);
  },
};
