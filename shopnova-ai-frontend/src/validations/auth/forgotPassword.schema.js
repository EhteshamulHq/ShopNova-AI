/**
 * ==========================================================
 * ShopNova AI
 * File: forgotPassword.schema.js
 *
 * Backend API:
 * POST /api/auth/forgot-password
 */

import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
});