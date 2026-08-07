/**
 * ==========================================================
 * ShopNova AI
 * Notification API Layer
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const notificationApi = {
  getNotifications(params) {
    return api.get(ENDPOINTS.NOTIFICATIONS.ROOT, { params });
  },

  markAsRead(id) {
    return api.patch(ENDPOINTS.NOTIFICATIONS.READ(id));
  },

  markAllAsRead() {
    return api.patch(ENDPOINTS.NOTIFICATIONS.READ_ALL);
  },

  deleteNotification(id) {
    return api.delete(ENDPOINTS.NOTIFICATIONS.DELETE(id));
  },

  getUnreadCount() {
    return api.get(ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT);
  },
};