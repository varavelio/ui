/**
 * @fileoverview Type-safe interface for the Varavel UI theme bootstrapper.
 * Provides safe methods to interact with the underlying global theme engine.
 */

/**
 * Extends the global Window interface to include the __varavelUiTheme property,
 * which is the bridge to the Varavel UI theme engine. This allows us to safely
 * access and manipulate the theme preference from anywhere in the application.
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
 * Reactive theme engine for the Varavel UI.
 *
 * This store synchronizes the Svelte state with the global theme engine
 * and provides a reactive interface for components.
 */
class ThemeStore {
  /**
   * Internal reactive state powered by Svelte 5 runes.
   *
   * Initializes to "system" to prevent hydration mismatches during SSR.
   *
   * @private
   */
  private _current = $state<Theme>("system");

  /**
   * Creates a new instance of the theme store.
   *
   * On the client side, it initializes the current theme and sets up a subscription
   * to global theme changes to keep the state in sync.
   */
  constructor() {
    if (typeof window === "undefined") {
      return;
    }

    // Capture initial state on the client
    this._current = this.get();

    // Subscribe to global DOM events.
    // This ensures that if window.__varavelUiTheme.set() is called directly,
    // the Svelte state stays in sync and updates the UI instantly.
    this.subscribe((newTheme) => {
      this._current = newTheme;
    });
  }

  /**
   * Reactive getter for the current theme.
   *
   * Use this inside Svelte components to reactively track theme changes.
   *
   * @example
   * <div class={theme.current === 'dark' ? 'dark-mode' : 'light-mode'}>
   *
   * @returns {Theme} The currently active theme preference.
   */
  public get current(): Theme {
    return this._current;
  }

  /**
   * Safely retrieves the currently active theme preference from the global engine.
   *
   * Falls back to "system" if executed in SSR or if the bootstrapper is unavailable.
   *
   * @returns {Theme} The current theme ("light", "dark", or "system").
   */
  public get(): Theme {
    if (typeof window !== "undefined" && window.__varavelUiTheme) {
      return window.__varavelUiTheme.get();
    }
    return "system";
  }

  /**
   * Updates the global theme preference, persists it to local storage,
   * and immediately triggers a DOM update across the application.
   *
   * @param {Theme} targetTheme - The target theme to apply ("light", "dark", or "system").
   */
  public set(targetTheme: Theme): void {
    if (typeof window !== "undefined" && window.__varavelUiTheme) {
      window.__varavelUiTheme.set(targetTheme);
    }
  }

  /**
   * Subscribes to global theme change events dispatched by the theme engine.
   *
   * @param {(theme: Theme) => void} callback - A function called whenever the theme changes.
   * @returns {() => void} A cleanup function to remove the event listener.
   */
  public subscribe(callback: (theme: Theme) => void): () => void {
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
  }
}

/**
 * A reactive utility object for managing the Varavel UI theme preference.
 */
export const theme = new ThemeStore();
