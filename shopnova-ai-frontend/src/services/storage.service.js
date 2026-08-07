/**
 * ==========================================================
 * File: src/services/storage.service.js
 * Purpose:
 * Safe wrapper around localStorage.
 * ==========================================================
 */

class StorageService {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    const value = localStorage.getItem(key);

    if (value === null) return null;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

const storageService = new StorageService();

export default storageService;