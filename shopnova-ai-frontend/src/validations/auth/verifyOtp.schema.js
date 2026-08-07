/**
 * ==========================================================
 * ShopNova AI
 * File: verifyOtp.schema.js
 *
 * Purpose:
 * Validate OTP verification form.
 *
 * Backend API:
 * POST /api/auth/verify-otp
 *
 * Request Body:
 * {
 *   email,
 *   otp
 * }
 * ==========================================================
 */

import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  otp: z
    .string()
    .trim()
    .length(6, "OTP must be exactly 6 digits.")
    .regex(/^\d+$/, "OTP must contain only numbers."),
});