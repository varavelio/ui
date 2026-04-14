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
   * Resolves the theme to a concrete "light" or "dark" value.
   * @param {string} theme - The theme to resolve.
   * @returns {"light"|"dark"} The resolved theme.
   */
  const resolveTheme = (theme) => {
    if (theme === "light") return "light";
    if (theme === "dark") return "dark";
    return mql?.matches ? "dark" : "light";
  };

  /**
   * Safely retrieves the stored theme and its resolved value.
   * @returns {{ theme: "light"|"dark"|"system", resolved: "light"|"dark" }}
   */
  const getThemeState = () => {
    let theme = "system";
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isValidTheme(stored)) {
        theme = stored;
      } else {
        localStorage.setItem(STORAGE_KEY, "system");
      }
    } catch (_) {
      // Fallback already set to "system"
    }

    return {
      theme,
      resolved: resolveTheme(theme),
    };
  };

  /**
   * Applies the resolved theme to the DOM.
   *
   * It also dispatches a custom event "varavel-theme-change" with details about the
   * current theme and the resolved theme.
   *
   * @param {"light"|"dark"|"system"} theme - The user's theme preference.
   */
  const applyDOM = (theme) => {
    try {
      const resolved = resolveTheme(theme);

      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;

      window.dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, {
          detail: { theme, resolved },
        }),
      );
    } catch (_) {
      // Fail silently in highly restrictive environments
    }
  };

  // Initial synchronous paint to prevent FOUC
  const initialState = getThemeState();
  applyDOM(initialState.theme);

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
    get: getThemeState,
  };

  // React to OS-level theme changes (e.g., sunset/sunrise schedules)
  if (mql) {
    mql.addEventListener("change", () => {
      const state = getThemeState();
      if (state.theme === "system") {
        applyDOM("system");
      }
    });
  }

  // Cross-tab synchronization (updates UI if theme changes in another tab)
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      const state = getThemeState();
      if (isValidTheme(state.theme)) {
        applyDOM(state.theme);
      }
    }
  });
})();
