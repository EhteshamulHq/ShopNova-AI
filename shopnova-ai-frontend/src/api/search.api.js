/**
 * ==========================================================
 * ShopNova AI
 * Global Search API Layer
 * ==========================================================
 */

import api from "./axios";
import { ENDPOINTS } from "./endpoints";

export const searchApi = {
  search(keyword) {
    return api.get(ENDPOINTS.SEARCH, {
      params: {
        keyword,
      },
    });
  },
};