/**
 * ==========================================================
 * ShopNova AI
 * File: src/features/auth/authThunks.js
 *
 * Purpose:
 * Authentication Async Thunks
 *
 * Backend APIs
 * POST   /api/auth/login
 * POST   /api/auth/register
 * GET    /api/auth/profile
 * PUT    /api/auth/profile
 * PUT    /api/auth/change-password
 * DELETE /api/auth/delete-account
 *
 * Redux Slice
 * auth
 * ==========================================================
 */

import { createAsyncThunk } from "@reduxjs/toolkit";

import { authApi } from "../../api/auth.api";

import { tokenService } from "../../services/token.service";

import storageService from "../../services/storage.service";

import { STORAGE_KEYS } from "../../constants/app.constants";

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(credentials);
      if (!data.success) {
  throw new Error("Login failed.");
}

      tokenService.setAccessToken(data.token);

      storageService.set(
        STORAGE_KEYS.USER,
        data.user
      );

      return {
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login failed."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(formData);
      if (!response.data.success) {
  throw new Error(
    response.data.message ||
      "Registration failed."
  );
}

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| VERIFY OTP
|--------------------------------------------------------------------------
*/

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response =
        await authApi.verifyOtp(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "OTP verification failed."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| RESEND OTP
|--------------------------------------------------------------------------
*/

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response =
        await authApi.resendOtp(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD
|--------------------------------------------------------------------------
*/

export const forgotPassword =
  createAsyncThunk(
    "auth/forgotPassword",
    async (data, { rejectWithValue }) => {
      try {
        const response =
          await authApi.forgotPassword(data);

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to send reset email."
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| RESET PASSWORD
|--------------------------------------------------------------------------
*/

export const resetPassword =
  createAsyncThunk(
    "auth/resetPassword",
    async (
      { token, password },
      { rejectWithValue }
    ) => {
      try {
        const response =
          await authApi.resetPassword(
            token,
            {
              password,
            }
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to reset password."
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| GET PROFILE
|--------------------------------------------------------------------------
*/

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile();

      storageService.set(
        STORAGE_KEYS.USER,
        response.data.user
      );

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch profile."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| UPDATE PROFILE
|--------------------------------------------------------------------------
*/

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const { data: response } =
  await authApi.updateProfile(data);

storageService.set(
  STORAGE_KEYS.USER,
  response.user
);

return response.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| CHANGE PASSWORD
|--------------------------------------------------------------------------
*/

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const { data: response } =
  await authApi.changePassword(data);

return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to change password."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| DELETE ACCOUNT
|--------------------------------------------------------------------------
*/
export const deleteAccount =
  createAsyncThunk(
    "auth/deleteAccount",
    async (_, { rejectWithValue }) => {
      try {
        await authApi.deleteAccount();

        tokenService.clear();

        storageService.remove(
          STORAGE_KEYS.USER
        );

        return true;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Unable to delete account."
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    tokenService.clear();

    storageService.remove(STORAGE_KEYS.USER);

    return true;
  }
);