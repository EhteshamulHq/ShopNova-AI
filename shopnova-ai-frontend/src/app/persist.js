/**
 * ==========================================================
 * File: src/app/persist.js
 * Purpose:
 * Redux Persist Configuration
 * ==========================================================
 */

// Provide a safe storage wrapper that uses `window.localStorage` in the
// browser, but falls back to a noop async storage during server-side
// evaluation (or Vite dependency optimization) so storage APIs are not
// accessed where `window` is unavailable.
const storage = (() => {
  if (typeof window !== "undefined" && window.localStorage) {
    return {
      getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
      setItem: (key, value) =>
        Promise.resolve(window.localStorage.setItem(key, value)),
      removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
    };
  }

  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
})();

export const persistConfig = {
  key: "shopnova",

  version: 1,

  storage,

  whitelist: ["theme", "auth"],
};

// Debug: log storage API shape during module evaluation
try {
  // eslint-disable-next-line no-console
  console.log("persist.js: storage.getItem type ->", typeof storage.getItem);
} catch (e) {}
