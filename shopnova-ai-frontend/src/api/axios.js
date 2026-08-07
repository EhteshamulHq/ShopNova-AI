/**
 * ==========================================================
 * ShopNova AI
 *
 * File:
 * src/api/axios.js
 *
 * Purpose:
 * Central Axios Instance
 *
 * ==========================================================
 */

import axios from "axios";

import { APP_CONFIG } from "../config/app.config";

import { tokenService } from "../services/token.service";

const api = axios.create({

  baseURL: APP_CONFIG.API_BASE_URL,

  timeout: 30000,

  headers: {

    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(

  (config) => {

    const token = tokenService.getAccessToken();

if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      tokenService.clear();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;