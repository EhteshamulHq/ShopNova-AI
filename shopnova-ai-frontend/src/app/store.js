/**
 * ==========================================================
 * File: src/app/store.js
 * Purpose:
 * Redux Store Configuration
 * ==========================================================
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

import { persistConfig } from "./persist";

import themeReducer from "../features/theme";
import authReducer from "../features/auth";
import addressReducer from "../features/address";

const rootReducer = combineReducers({
  theme: themeReducer,

  auth: authReducer,

  address: addressReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});

let persistor;

export function initPersistor() {
  if (persistor) return persistor;

  if (typeof window === "undefined") return null;

  // Debug: ensure the storage provided to redux-persist has the expected API
  try {
    // eslint-disable-next-line no-console
    console.log("initPersistor: persist storage:", persistConfig.storage);
    // eslint-disable-next-line no-console
    console.log(
      "initPersistor: storage keys:",
      Object.keys(persistConfig.storage || {}),
    );
    // eslint-disable-next-line no-console
    console.log(
      "initPersistor: storage.getItem typeof ->",
      typeof (persistConfig.storage || {}).getItem,
    );
    // eslint-disable-next-line no-console
    console.log(
      "initPersistor: storage.setItem typeof ->",
      typeof (persistConfig.storage || {}).setItem,
    );
  } catch (e) {}

  // Replace the reducer with a persisted reducer in the browser runtime
  try {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    store.replaceReducer(persistedReducer);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("initPersistor: failed to replace reducer:", e);
  }

  persistor = persistStore(store);

  return persistor;
}
