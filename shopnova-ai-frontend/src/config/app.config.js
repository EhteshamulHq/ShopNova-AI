/**
 * ==========================================================
 * File: src/config/app.config.js
 * Purpose:
 * Reads application configuration from Vite environment.
 * ==========================================================
 */

export const APP_CONFIG = Object.freeze({
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  RAZORPAY_KEY: import.meta.env.VITE_RAZORPAY_KEY,
  DEFAULT_THEME: import.meta.env.VITE_DEFAULT_THEME || "light",
});