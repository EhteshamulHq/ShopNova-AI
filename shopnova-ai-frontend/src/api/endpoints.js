/**
 * ===========================================================
 * ShopNova AI
 * File:
 * src/api/endpoints.js
 *
 * Purpose:
 * Centralized Backend Endpoints
 * ===========================================================
 */

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    SEND_OTP: "/auth/send-otp",
    RESEND_OTP: "/auth/resend-otp",
    VERIFY_OTP: "/auth/verify-otp",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: (token) => `/auth/reset-password/${token}`,
    PROFILE: "/auth/profile",
    CHANGE_PASSWORD: "/auth/change-password",
    DELETE_ACCOUNT: "/auth/delete-account",
  },

  USERS: {
    LIST: "/users",
    DETAILS: (id) => `/users/${id}`,
    STATUS: (id) => `/users/${id}/status`,
  },

  CATEGORIES: {
    LIST: "/categories",
    DETAILS: (id) => `/categories/${id}`,
  },

  BRANDS: {
    LIST: "/brands",
    DETAILS: (id) => `/brands/${id}`,
  },

  PRODUCTS: {
    LIST: "/products",
    DETAILS: (id) => `/products/${id}`,
    FEATURED: "/products/featured",
    LATEST: "/products/latest",
    SEARCH: "/products/search",
    RELATED: "/products/related",
    CATEGORY: (id) => `/products/category/${id}`,
    BRAND: (id) => `/products/brand/${id}`,
  },

  CART: {
    ROOT: "/cart",
    CLEAR: "/cart/clear",
  },

  WISHLIST: {
    ROOT: "/wishlist",
    DELETE: (id) => `/wishlist/${id}`,
  },

 ADDRESS: {
  LIST: "/address",

  CREATE: "/address",

  DETAIL: (id) =>
    `/address/${id}`,

  UPDATE: (id) =>
    `/address/${id}`,

  DELETE: (id) =>
    `/address/${id}`,

 SET_DEFAULT: (id) =>
  `/address/default/${id}`,
},

  COUPONS: {
    ROOT: "/coupons",
    DETAILS: (id) => `/coupons/${id}`,
    APPLY: "/coupons/apply",
    REMOVE: "/coupons/remove",
  },

  ORDERS: {
    ROOT: "/orders",
    DETAILS: (id) => `/orders/${id}`,
    CANCEL: (id) => `/orders/${id}/cancel`,
    STATUS: (id) => `/orders/${id}/status`,
    ADMIN: "/orders/admin",
  },

  PAYMENTS: {
    CREATE_ORDER: "/payments/create-order",
    VERIFY: "/payments/verify",
    WEBHOOK: "/payments/webhook",
    REFUND: "/payments/refund",
  },

  DASHBOARD: "/dashboard",

  ANALYTICS: {
    SALES: "/analytics/sales",
    REVENUE: "/analytics/revenue",
    USERS: "/analytics/users",
    PRODUCTS: "/analytics/products",
    CATEGORIES: "/analytics/categories",
    BRANDS: "/analytics/brands",
    ORDERS: "/analytics/orders",
    DATE_RANGE: "/analytics/date-range",
    DASHBOARD: "/analytics/dashboard",
    EXPORT: "/analytics/export",
  },

  NOTIFICATIONS: {
    ROOT: "/notifications",
    READ: (id) => `/notifications/${id}/read`,
    READ_ALL: "/notifications/read-all",
    DELETE: (id) => `/notifications/${id}`,
    UNREAD_COUNT: "/notifications/unread-count",
  },

  REPORTS: {
    SALES: "/reports/sales",
    USERS: "/reports/users",
  },

  SEARCH: "/search",
};