/**
 * ==========================================================
 * ShopNova AI
 * Payment API Layer
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const paymentApi = {
  createOrder(data) {
    return api.post(ENDPOINTS.PAYMENTS.CREATE_ORDER, data);
  },

  verifyPayment(data) {
    return api.post(ENDPOINTS.PAYMENTS.VERIFY, data);
  },

  refundPayment(data) {
    return api.post(ENDPOINTS.PAYMENTS.REFUND, data);
  },
};