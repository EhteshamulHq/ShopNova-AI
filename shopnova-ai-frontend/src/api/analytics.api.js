/**
 * ==========================================================
 * ShopNova AI
 * Analytics API Layer
 * ==========================================================
 */

import api from "./axios";

export const analyticsApi = {
  getSales(params) {
    return api.get(ENDPOINTS.ANALYTICS.SALES, { params });
  },

  getRevenue(params) {
    return api.get(ENDPOINTS.ANALYTICS.REVENUE, { params });
  },

  getUsers(params) {
    return api.get(ENDPOINTS.ANALYTICS.USERS, { params });
  },

  getProducts(params) {
    return api.get(ENDPOINTS.ANALYTICS.PRODUCTS, { params });
  },

  getCategories(params) {
    return api.get(ENDPOINTS.ANALYTICS.CATEGORIES, { params });
  },

  getBrands(params) {
    return api.get(ENDPOINTS.ANALYTICS.BRANDS, { params });
  },

  getOrders(params) {
    return api.get(ENDPOINTS.ANALYTICS.ORDERS, { params });
  },

  getDateRange(params) {
    return api.get(ENDPOINTS.ANALYTICS.DATE_RANGE, { params });
  },

  getDashboard(params) {
    return api.get(ENDPOINTS.ANALYTICS.DASHBOARD, { params });
  },

  exportReport(params) {
    return api.get(ENDPOINTS.ANALYTICS.EXPORT, {
      params,
      responseType: "blob",
    });
  },
};