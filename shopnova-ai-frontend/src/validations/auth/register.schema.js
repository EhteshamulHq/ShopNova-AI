/**
 * ==========================================================
 * ShopNova AI
 * File: register.schema.js
 *
 * Purpose:
 * Client-side validation for user registration.
 *
 * Backend API:
 * POST /api/auth/register
 *
 * Backend Validation Mapping:
 * - name: required, 2-50 chars
 * - email: valid email
 * - password:
 *   - min 8 chars
 *   - 1 uppercase
 *   - 1 lowercase
 *   - 1 number
 *   - 1 special character
 * ==========================================================
 */

import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name cannot exceed 50 characters."),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),

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