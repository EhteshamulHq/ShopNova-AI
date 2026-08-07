/**
 * ==========================================================
 * File: src/config/routes.js
 * Purpose:
 * Centralized application route paths.
 * ==========================================================
 */

export const ROUTES = Object.freeze({
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // User
  PROFILE: "/profile",
  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",
  ORDERS: "/orders",
  NOTIFICATIONS: "/notifications",

  // Products
  PRODUCTS: "/products",
  PRODUCT_DETAILS: "/products/:id",

  // Admin
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_BRANDS: "/admin/brands",
  ADMIN_USERS: "/admin/users",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_ANALYTICS: "/admin/analytics",
});