/**
 * @fileoverview Varavel UI Theme Bootstrapper.
 *
 * Synchronously resolves and applies the theme before the first paint to prevent
 * FOUC (Flash of Unstyled Content).
 *
 * Safely exposes a runtime API via window.__varavelUiTheme.
 */

(() => {
  const STORAGE_KEY = "varavel-theme";
  const THEME_CHANGE_EVENT = "varavel-theme-change";

  // Safely initialize matchMedia for environments that support it
  const mql =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

  /**
   * Validates if the provided theme string is supported.
   * @param {string} t - The theme to validate.
   * @returns {boolean} True if the theme is valid.
   */
  const isValidTheme = (t) => t === "light" || t === "dark" || t === "system";

  /**
   * Safely retrieves the stored theme, guarding against restricted environments
   * (e.g., Safari Private Mode, cross-origin iframes).
   * @returns {"light"|"dark"|"system"} The resolved theme preference.
   */
  const getStoredTheme = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return isValidTheme(stored) ? stored : "system";
    } catch (_) {
      return "system"; // Safe fallback
    }
  };

  /**
   * Applies the resolved theme to the DOM.
   * @param {"light"|"dark"|"system"} theme - The user's theme preference.
   */
  const applyDOM = (theme) => {
    try {
      let resolved = theme;

      if (theme === "system") {
        resolved = mql?.matches ? "dark" : "light";
      }

      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;

      window.dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, {
          detail: theme,
        }),
      );
    } catch (_) {
      // Fail silently in highly restrictive environments
    }
  };

  // Initial synchronous paint to prevent FOUC
  applyDOM(getStoredTheme());

  // Expose the runtime API in a highly specific, non-colliding namespace
  window.__varavelUiTheme = {
    set: (newTheme) => {
      const safeTheme = isValidTheme(newTheme) ? newTheme : "system";
      try {
        localStorage.setItem(STORAGE_KEY, safeTheme);
      } catch (_) {
        // Ignore storage quotas or privacy blocks
      }
      applyDOM(safeTheme);
    },
    get: getStoredTheme,
  };

  // React to OS-level theme changes (e.g., sunset/sunrise schedules)
  if (mql) {
    mql.addEventListener("change", () => {
      if (getStoredTheme() === "system") {
        applyDOM("system");
      }
    });
  }

  // Cross-tab synchronization (updates UI if theme changes in another tab)
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      applyDOM(getStoredTheme());
    }
  });
})();
