/**
 * ===========================================================
 * ShopNova AI
 * Cart API Layer
 * ===========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const cartApi = {
  getCart() {
    return api.get(ENDPOINTS.CART.ROOT);
  },

  addToCart(data) {
    return api.post(ENDPOINTS.CART.ROOT, data);
  },

  updateCart(data) {
    return api.patch(ENDPOINTS.CART.ROOT, data);
  },

  removeCartItem(data) {
    return api.delete(ENDPOINTS.CART.ROOT, {
      data,
    });
  },

  clearCart() {
    return api.delete(ENDPOINTS.CART.CLEAR);
  },
};