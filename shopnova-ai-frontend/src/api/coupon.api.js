/**
 * ==========================================================
 * ShopNova AI
 * Coupon API Layer
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const couponApi = {
  getCoupons(params) {
    return api.get(ENDPOINTS.COUPONS.ROOT, { params });
  },

  createCoupon(data) {
    return api.post(ENDPOINTS.COUPONS.ROOT, data);
  },

  updateCoupon(id, data) {
    return api.put(`${ENDPOINTS.COUPONS.ROOT}/${id}`, data);
  },

  deleteCoupon(id) {
    return api.delete(`${ENDPOINTS.COUPONS.ROOT}/${id}`);
  },

  applyCoupon(data) {
    return api.post(ENDPOINTS.COUPONS.APPLY, data);
  },

  removeCoupon() {
    return api.delete(ENDPOINTS.COUPONS.REMOVE);
  },
};