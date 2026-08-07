/**
 * ==========================================================
 * ShopNova AI
 * Order API Layer
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const orderApi = {
  createOrder(data) {
    return api.post(ENDPOINTS.ORDERS.ROOT, data);
  },

  getOrders(params) {
    return api.get(ENDPOINTS.ORDERS.ROOT, { params });
  },

  getOrder(id) {
    return api.get(ENDPOINTS.ORDERS.DETAILS(id));
  },

  cancelOrder(id) {
    return api.patch(ENDPOINTS.ORDERS.CANCEL(id));
  },

  updateOrderStatus(id, data) {
    return api.patch(ENDPOINTS.ORDERS.STATUS(id), data);
  },

  getAdminOrders(params) {
    return api.get(ENDPOINTS.ORDERS.ADMIN, { params });
  },
};