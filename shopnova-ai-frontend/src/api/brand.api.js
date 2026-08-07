/**
 * ==========================================================
 * ShopNova AI
 * Brand API Layer
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const brandApi = {
  getBrands(params) {
    return api.get(ENDPOINTS.BRANDS.LIST, { params });
  },

  getBrand(id) {
    return api.get(ENDPOINTS.BRANDS.DETAILS(id));
  },

  createBrand(data) {
    return api.post(ENDPOINTS.BRANDS.LIST, data);
  },

  updateBrand(id, data) {
    return api.put(ENDPOINTS.BRANDS.DETAILS(id), data);
  },

  deleteBrand(id) {
    return api.delete(ENDPOINTS.BRANDS.DETAILS(id));
  },
};