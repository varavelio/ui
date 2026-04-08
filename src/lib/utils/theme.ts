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
 * Defines the valid theme options for Varavel UI.
 */
export type Theme = "light" | "dark" | "system";

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
};
