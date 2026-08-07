import { z } from "zod";

export const addressSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required."),

  mobileNumber: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit mobile number."
    ),

  alternateMobileNumber: z
    .string()
    .optional()
    .or(z.literal("")),

  addressLine1: z
    .string()
    .trim()
    .min(5, "Address Line 1 is required."),

  addressLine2: z
    .string()
    .optional()
    .or(z.literal("")),

  landmark: z
    .string()
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .trim()
    .min(2, "City is required."),

  state: z
    .string()
    .trim()
    .min(2, "State is required."),

  country: z
    .string()
    .trim()
    .default("India"),

  postalCode: z
    .string()
    .regex(
      /^\d{6}$/,
      "Postal Code must be 6 digits."
    ),

  addressType: z.enum([
    "Home",
    "Office",
    "Other",
  ]),
});