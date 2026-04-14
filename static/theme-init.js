/**
 * @fileoverview Varavel UI theme bootstrapper.
 *
 * Resolves and applies the user's saved theme preference before the first paint
 * to prevent a flash of incorrect theme styles.
 *
 * The bootstrapper also exposes a small runtime bridge on
 * `window.__varavelUiTheme` so the Svelte runtime can read and update the same
 * source of truth without duplicating browser logic.
 */

(() => {
  const STORAGE_KEY = "varavel-theme";
  const THEME_CHANGE_EVENT = "varavel-theme-change";

  /** @typedef {"light" | "dark" | "system"} ThemePreference */
  /** @typedef {"light" | "dark"} ResolvedTheme */

  /**
   * @typedef {object} ThemeState
   * @property {ThemePreference} theme The saved user preference.
   * @property {ResolvedTheme} resolved The concrete theme applied to the document.
   */

  /**
   * @typedef {object} ThemeRuntimeApi
   * @property {(theme: ThemePreference) => void} set Persists and applies a preference.
   * @property {() => ThemeState} get Returns the current preference and resolved theme.
   */

  // `matchMedia` is optional in restrictive or non-browser environments.
  const mql =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

  /**
   * Returns whether a value is a supported theme preference.
   *
   * @param {unknown} value - Value to validate.
   * @returns {value is ThemePreference} Whether the value is supported.
   */
  const isThemePreference = (value) =>
    value === "light" || value === "dark" || value === "system";

  /**
   * Resolves a preference to the concrete theme applied to the document.
   *
   * `"system"` follows the current `prefers-color-scheme` media query.
   *
   * @param {ThemePreference} theme - Preference to resolve.
   * @returns {ResolvedTheme} The resolved document theme.
   */
  const resolveTheme = (theme) => {
    if (theme === "light") return "light";
    if (theme === "dark") return "dark";
    return mql?.matches ? "dark" : "light";
  };

  /**
   * Reads the saved theme preference and derives the resolved document theme.
   *
   * If storage is unavailable or contains an invalid value, the preference falls
   * back to `"system"`.
   *
   * @returns {ThemeState} The current preference and resolved theme.
   */
  const getThemeState = () => {
    /** @type {ThemePreference} */
    let theme = "system";

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isThemePreference(stored)) {
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
   * Applies a theme preference to the document and emits a runtime update event.
   *
   * The document keeps both `data-theme` and the `dark` class in sync so the
   * runtime works with the package theme tokens and any consumer CSS that relies
   * on Tailwind's dark selector.
   *
   * @param {ThemePreference} theme - Theme preference to apply.
   */
  const applyDOM = (theme) => {
    try {
      const resolved = resolveTheme(theme);

      document.documentElement.dataset.theme = resolved;
      document.documentElement.classList.toggle("dark", resolved === "dark");
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

  /** @type {ThemeRuntimeApi} */
  window.__varavelUiTheme = {
    /**
     * Persists and applies a theme preference immediately.
     *
     * Invalid input is normalized to `"system"` to keep the runtime predictable.
     *
     * @param {ThemePreference} newTheme - Preference to save and apply.
     */
    set: (newTheme) => {
      const safeTheme = isThemePreference(newTheme) ? newTheme : "system";
      try {
        localStorage.setItem(STORAGE_KEY, safeTheme);
      } catch (_) {
        // Ignore storage quotas or privacy blocks
      }
      applyDOM(safeTheme);
    },

    /**
     * Returns the current theme state.
     *
     * @returns {ThemeState} The saved preference and resolved document theme.
     */
    get: getThemeState,
  };

  // React to OS-level theme changes when the active preference is `system`.
  if (mql) {
    const handleSystemThemeChange = () => {
      const state = getThemeState();
      if (state.theme === "system") {
        applyDOM("system");
      }
    };

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleSystemThemeChange);
    } else if (typeof mql.addListener === "function") {
      mql.addListener(handleSystemThemeChange);
    }
  }

  // Keep other tabs in sync, including `localStorage.clear()` resets.
  window.addEventListener("storage", (event) => {
    if (event.storageArea !== localStorage) {
      return;
    }

    if (event.key === STORAGE_KEY || event.key === null) {
      applyDOM(getThemeState().theme);
    }
  });
})();
