/**
 * ===========================================================
 * ShopNova AI
 * Wishlist API Layer
 * ===========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const wishlistApi = {
  getWishlist() {
    return api.get(ENDPOINTS.WISHLIST.ROOT);
  },

  addToWishlist(data) {
    return api.post(ENDPOINTS.WISHLIST.ROOT, data);
  },

  removeFromWishlist(id) {
    return api.delete(ENDPOINTS.WISHLIST.DELETE(id));
  },
};