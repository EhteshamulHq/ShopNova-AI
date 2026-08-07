/**
 * ============================================================
 * File:
 * src/features/theme/themeSlice.js
 *
 * Purpose:
 * Global theme management.
 *
 * Backend API:
 * None
 * ============================================================
 */

import { createSlice } from "@reduxjs/toolkit";

import { THEMES } from "../../constants/app.constants";

const initialState = {
  mode:
    localStorage.getItem("shopnova_theme") ||
    THEMES.LIGHT,
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    toggleTheme(state) {
      state.mode =
        state.mode === THEMES.DARK
          ? THEMES.LIGHT
          : THEMES.DARK;

      localStorage.setItem(
        "shopnova_theme",
        state.mode
      );

      document.documentElement.classList.toggle(
        "dark",
        state.mode === THEMES.DARK
      );
    },

    setTheme(state, action) {
      state.mode = action.payload;

      localStorage.setItem(
        "shopnova_theme",
        action.payload
      );

      document.documentElement.classList.toggle(
        "dark",
        action.payload === THEMES.DARK
      );
    },
  },
});

export const {
  toggleTheme,
  setTheme,
} = themeSlice.actions;

export default themeSlice.reducer;