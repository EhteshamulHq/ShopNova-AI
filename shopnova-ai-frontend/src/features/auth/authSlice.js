import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  logout,
} from "./authThunks";
import { tokenService } from "../../services/token.service";
import storageService from "../../services/storage.service";
import { STORAGE_KEYS } from "../../constants/app.constants";

const storedUser = storageService.get(STORAGE_KEYS.USER);

const initialState = {
  user: storedUser || null,

  token:
  tokenService.getAccessToken() || null,

isAuthenticated:
  !!storedUser &&
  !!tokenService.getAccessToken(),

  loading: false,

  error: null,

  success: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError(state) {
      state.error = null;
    },

    clearAuthSuccess(state) {
      state.success = null;
    },

    resetAuthState(state) {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.token;

        state.isAuthenticated = true;

        state.success = "Login successful.";
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        state.success =
          action.payload.message ||
          "Registration successful.";
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })


      // VERIFY OTP
.addCase(verifyOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(verifyOtp.fulfilled, (state, action) => {
  state.loading = false;

  state.success =
    action.payload.message ||
    "Email verified successfully.";
})

.addCase(verifyOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

// RESEND OTP
.addCase(resendOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(resendOtp.fulfilled, (state, action) => {
  state.loading = false;

  state.success =
    action.payload.message ||
    "OTP sent successfully.";
})

.addCase(resendOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

// FORGOT PASSWORD
.addCase(forgotPassword.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(forgotPassword.fulfilled, (state, action) => {
  state.loading = false;

  state.success =
    action.payload.message ||
    "Reset link sent.";
})

.addCase(forgotPassword.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

// RESET PASSWORD
.addCase(resetPassword.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(resetPassword.fulfilled, (state, action) => {
  state.loading = false;

  state.success =
    action.payload.message ||
    "Password reset successful.";
})

.addCase(resetPassword.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

      // PROFILE
      .addCase(getProfile.pending, (state) => {
  state.loading = true;
})

.addCase(getProfile.fulfilled, (state, action) => {
  state.loading = false;

  state.user = action.payload;

  storageService.set(
    STORAGE_KEYS.USER,
    action.payload
  );
})

.addCase(getProfile.rejected, (state, action) => {
  state.loading = false;

  state.error = action.payload;
})

      // UPDATE
      .addCase(updateProfile.pending, (state) => {
  state.loading = true;
})

.addCase(updateProfile.fulfilled, (state, action) => {
  state.loading = false;

  state.user = action.payload;

  state.success =
    "Profile updated successfully.";
})

.addCase(updateProfile.rejected, (state, action) => {
  state.loading = false;

  state.error = action.payload;
})

      // PASSWORD
     // PASSWORD
.addCase(changePassword.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(changePassword.fulfilled, (state, action) => {
  state.loading = false;

  state.success =
    action.payload.message ||
    "Password changed successfully.";
})

.addCase(changePassword.rejected, (state, action) => {
  state.loading = false;

  state.error = action.payload;
})

      // DELETE
     .addCase(deleteAccount.pending, (state) => {
  state.loading = true;
})

.addCase(deleteAccount.fulfilled, (state) => {
  state.loading = false;

  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
})

.addCase(deleteAccount.rejected, (state, action) => {
  state.loading = false;

  state.error = action.payload;
})

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;

        state.token = null;

        state.isAuthenticated = false;

        state.loading = false;

        state.error = null;

        state.success = null;
      });
  },
});

export const {
  clearAuthError,
  clearAuthSuccess,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;