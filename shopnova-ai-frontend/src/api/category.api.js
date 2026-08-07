/**
 * ==========================================================
 * ShopNova AI
 * Category API Layer
 *
 * Backend APIs
 * POST   /api/categories
 * GET    /api/categories
 * GET    /api/categories/:id
 * PUT    /api/categories/:id
 * DELETE /api/categories/:id
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const categoryApi = {
  getCategories(params) {
    return api.get(ENDPOINTS.CATEGORIES.LIST, { params });
  },

  getCategory(id) {
    return api.get(ENDPOINTS.CATEGORIES.DETAILS(id));
  },

  createCategory(data) {
    return api.post(ENDPOINTS.CATEGORIES.LIST, data);
  },

  updateCategory(id, data) {
    return api.put(ENDPOINTS.CATEGORIES.DETAILS(id), data);
  },

  deleteCategory(id) {
    return api.delete(ENDPOINTS.CATEGORIES.DETAILS(id));
  },
};