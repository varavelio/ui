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
      set: (theme: ThemePreference) => void;
      get: () => ThemeState;
    };
  }
}

/**
 * The custom event name used by the Varavel UI to notify listeners of theme changes.
 */
const THEME_CHANGE_EVENT = "varavel-theme-change";

/**
 * Defines the valid theme preference options for Varavel UI.
 *
 * This represents what the user has selected.
 */
export type ThemePreference = "light" | "dark" | "system";

/**
 * Defines the resolved theme value after evaluating the preference.
 *
 * This represents the actual theme applied to the DOM.
 */
export type ThemeResolved = "light" | "dark";

/**
 * Represents the complete state of the theme engine.
 */
export interface ThemeState {
  /** The user's theme preference. */
  theme: ThemePreference;
  /** The actual theme applied to the application. */
  resolved: ThemeResolved;
}

/**
 * This function checks if the value is one of the allowed theme preference strings.
 */
const isThemePreference = (value: unknown): value is ThemePreference => {
  return value === "light" || value === "dark" || value === "system";
};

/**
 * This function checks if the value is one of the allowed resolved theme strings.
 */
const isThemeResolved = (value: unknown): value is ThemeResolved => {
  return value === "light" || value === "dark";
};

/**
 * This function checks if the value is a valid theme state object.
 */
const isThemeState = (value: unknown): value is ThemeState => {
  if (typeof value !== "object") return false;
  if (value === null) return false;
  if ("theme" in value === false) return false;
  if ("resolved" in value === false) return false;
  if (!isThemePreference(value.theme)) return false;
  if (!isThemeResolved(value.resolved)) return false;
  return true;
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
   * Initializes to "system"/"light" to prevent hydration mismatches during SSR.
   *
   * @private
   */
  private _state = $state<ThemeState>({
    theme: "system",
    resolved: "light",
  });

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
    this._state = this.get();

    // Subscribe to global DOM events.
    // This ensures that if window.__varavelUiTheme.set() is called directly,
    // the Svelte state stays in sync and updates the UI instantly.
    this.subscribe((newState) => {
      this._state = newState;
    });
  }

  /**
   * Reactive getter for the entire theme state.
   *
   * This includes both the user's preference and the resolved theme, allowing
   * components to react to any changes in the theme state as a whole.
   *
   * @returns {ThemeState} The current theme state object.
   */
  public get state(): ThemeState {
    return this._state;
  }

  /**
   * Reactive getter for the current theme preference.
   *
   * Use this inside Svelte components to reactively track theme changes.
   *
   * @returns {ThemePreference} The currently active theme preference.
   */
  public get current(): ThemePreference {
    return this._state.theme;
  }

  /**
   * Reactive getter for the resolved theme.
   *
   * This is useful for logic that needs to know if the UI is currently
   * effectively in 'dark' or 'light' mode, regardless of the 'system' setting.
   *
   * @returns {ThemeResolved} The resolved theme ("light" or "dark").
   */
  public get resolved(): ThemeResolved {
    return this._state.resolved;
  }

  /**
   * Safely retrieves the currently active theme state from the global engine.
   *
   * Falls back to a default state if executed in SSR or if the bootstrapper is unavailable.
   *
   * @returns {ThemeState} The current theme state including preference and resolved value.
   */
  public get(): ThemeState {
    if (typeof window !== "undefined" && window.__varavelUiTheme) {
      return window.__varavelUiTheme.get();
    }
    return { theme: "system", resolved: "light" };
  }

  /**
   * Updates the global theme preference, persists it to local storage,
   * and immediately triggers a DOM update across the application.
   *
   * @param {ThemePreference} targetTheme - The target theme to apply ("light", "dark", or "system").
   */
  public set(targetTheme: ThemePreference): void {
    if (
      isThemePreference(targetTheme) &&
      typeof window !== "undefined" &&
      window.__varavelUiTheme
    ) {
      window.__varavelUiTheme.set(targetTheme);
    }
  }

  /**
   * Subscribes to global theme change events dispatched by the theme engine.
   *
   * @param {(state: ThemeState) => void} callback - A function called whenever the theme changes.
   * @returns {() => void} A cleanup function to remove the event listener.
   */
  public subscribe(callback: (state: ThemeState) => void): () => void {
    if (typeof window === "undefined") {
      return () => {};
    }

    const handler = (event: Event) => {
      const nextState = (event as CustomEvent<unknown>).detail;
      if (isThemeState(nextState)) {
        callback(nextState);
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
