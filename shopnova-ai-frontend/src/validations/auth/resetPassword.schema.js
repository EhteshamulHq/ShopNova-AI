/**
 * ==========================================================
 * ShopNova AI
 * File: resetPassword.schema.js
 *
 * Backend API:
 * POST /api/auth/reset-password/:token
 *
 * NOTE:
 * Backend currently validates minimum 6 characters.
 * Frontend follows the stronger rule already used during
 * registration for consistency and better security.
 */

import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character."
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    }
  );