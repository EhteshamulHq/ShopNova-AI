/**
 * ==========================================================
 * ShopNova AI
 * Dashboard API Layer
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const dashboardApi = {
  getDashboard() {
    return api.get(ENDPOINTS.DASHBOARD);
  },
};