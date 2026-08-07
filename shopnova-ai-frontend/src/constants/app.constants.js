/**
 * ==========================================================
 * File: src/constants/app.constants.js
 * Purpose:
 * Global constants used throughout the application.
 * ==========================================================
 */

export const STORAGE_KEYS = Object.freeze({
  ACCESS_TOKEN: "shopnova_access_token",
  REFRESH_TOKEN: "shopnova_refresh_token",
  USER: "shopnova_user",
  THEME: "shopnova_theme",
});

export const USER_ROLES = Object.freeze({
  ADMIN: "admin",
  USER: "user",
});

export const THEMES = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
});

export const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 12,
});

export const API_TIMEOUT =
  Number(import.meta.env.VITE_API_TIMEOUT) || 30000;