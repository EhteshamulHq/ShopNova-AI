/**
 * ===========================================================
 * ShopNova AI
 * Product API Layer
 * ===========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const productApi = {
  getProducts(params) {
    return api.get(ENDPOINTS.PRODUCTS.LIST, { params });
  },

  getProductById(id) {
    return api.get(ENDPOINTS.PRODUCTS.DETAILS(id));
  },

  getFeaturedProducts() {
    return api.get(ENDPOINTS.PRODUCTS.FEATURED);
  },

  getLatestProducts() {
    return api.get(ENDPOINTS.PRODUCTS.LATEST);
  },

  searchProducts(params) {
    return api.get(ENDPOINTS.PRODUCTS.SEARCH, { params });
  },

  getRelatedProducts(params) {
    return api.get(ENDPOINTS.PRODUCTS.RELATED, { params });
  },

  getProductsByCategory(id) {
    return api.get(ENDPOINTS.PRODUCTS.CATEGORY(id));
  },

  getProductsByBrand(id) {
    return api.get(ENDPOINTS.PRODUCTS.BRAND(id));
  },

  createProduct(data) {
    return api.post(ENDPOINTS.PRODUCTS.LIST, data);
  },

  updateProduct(id, data) {
    return api.put(ENDPOINTS.PRODUCTS.DETAILS(id), data);
  },

  deleteProduct(id) {
    return api.delete(ENDPOINTS.PRODUCTS.DETAILS(id));
  },
};