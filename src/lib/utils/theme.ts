/**
 * @fileoverview Type-safe interface for the Varavel UI theme bootstrapper.
 * Provides safe methods to interact with the underlying global theme engine.
 */

declare global {
  interface Window {
    __varavelUiTheme?: {
      set: (theme: Theme) => void;
      get: () => Theme;
    };
  }
}

/**
 * The custom event name used by the Varavel UI to notify listeners of theme changes.
 */
const THEME_CHANGE_EVENT = "varavel-theme-change";

/**
 * Defines the valid theme options for Varavel UI.
 */
export type Theme = "light" | "dark" | "system";

/**
 * This function checks if the value is one of the allowed theme strings
 * "light", "dark", or "system".
 */
const isTheme = (value: unknown): value is Theme => {
  return value === "light" || value === "dark" || value === "system";
};

/**
 * A utility object for managing the Varavel UI theme preference. It provides
 * methods to get and set the current theme, abstracting away the underlying
 * implementation details and ensuring type safety.
 */
export const theme = {
  /**
   * Safely retrieves the currently active theme preference.
   *
   * Falls back to "system" if executed in SSR or if the bootstrapper failed.
   *
   * @returns {Theme} The current theme ("light", "dark", or "system").
   */
  get: (): Theme => {
    if (typeof window !== "undefined" && window.__varavelUiTheme) {
      return window.__varavelUiTheme.get();
    }
    return "system";
  },

  /**
   * Updates the global theme preference, persists it to local storage,
   * and immediately triggers a DOM update.
   *
   * @param {Theme} theme - The target theme to apply.
   */
  set: (theme: Theme): void => {
    if (typeof window !== "undefined" && window.__varavelUiTheme) {
      window.__varavelUiTheme.set(theme);
    }
  },

  /**
   * Subscribes to global theme changes.
   *
   * @param {(theme: Theme) => void} callback - Called whenever theme changes.
   * @returns {() => void} Cleanup function to remove listener.
   */
  subscribe: (callback: (theme: Theme) => void): (() => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const handler = (event: Event) => {
      const nextTheme = (event as CustomEvent<unknown>).detail;
      if (isTheme(nextTheme)) {
        callback(nextTheme);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handler);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handler);
    };
  },
};
