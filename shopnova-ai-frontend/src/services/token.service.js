/**
 * ==========================================================
 * File: src/services/token.service.js
 * Purpose:
 * Manage authentication tokens from one place.
 * ==========================================================
 */

import storageService from "./storage.service";
import { STORAGE_KEYS } from "../constants/app.constants";

export const tokenService = {
  getAccessToken() {
    return storageService.get(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setAccessToken(token) {
    storageService.set(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  removeAccessToken() {
    storageService.remove(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken() {
    return storageService.get(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken(token) {
    storageService.set(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  removeRefreshToken() {
    storageService.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  clear() {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};