/**
 * @fileoverview Reactive theme runtime for Varavel UI.
 *
 * This module is the typed Svelte-facing wrapper around the theme
 * bootstrapper in `static/theme-init.js`.
 */

/** The event name for theme change notifications. */
const THEME_CHANGE_EVENT = "varavel-theme-change";

/** The default theme state. */
const DEFAULT_THEME_STATE: ThemeState = {
  theme: "system",
  resolved: "light",
};

/**
 * A saved user preference.
 */
export type ThemePreference = "light" | "dark" | "system";

/**
 * The concrete theme currently applied to the document.
 */
export type ThemeResolved = "light" | "dark";

/**
 * The full runtime theme state.
 */
export interface ThemeState {
  /** The saved user preference. */
  theme: ThemePreference;
  /** The concrete theme currently applied to the document. */
  resolved: ThemeResolved;
}

/**
 * Low-level browser bridge provided by `static/theme-init.js`.
 *
 * `get()` returns the full state so consumers can read both the saved
 * preference and the resolved document theme from one source of truth.
 */
interface ThemeRuntimeBridge {
  set: (theme: ThemePreference) => void;
  get: () => ThemeState;
}

/**
 * Extends the global `Window` interface with the theme runtime bridge.
 */
declare global {
  interface Window {
    __varavelUiTheme?: ThemeRuntimeBridge;
  }
}

/**
 * Returns whether a value is a supported theme preference.
 */
const isThemePreference = (value: unknown): value is ThemePreference =>
  value === "light" || value === "dark" || value === "system";

/**
 * Returns whether a value is a supported resolved theme.
 */
const isThemeResolved = (value: unknown): value is ThemeResolved =>
  value === "light" || value === "dark";

/**
 * Returns whether a value matches the expected runtime theme state shape.
 */
const isThemeState = (value: unknown): value is ThemeState => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    isThemePreference(candidate.theme) && isThemeResolved(candidate.resolved)
  );
};

/**
 * Reactive theme runtime for Varavel UI.
 *
 * The store keeps Svelte state in sync with the global browser bootstrapper and
 * exposes a small ergonomic API for reading the saved preference, the resolved
 * document theme, or the full combined state.
 */
class ThemeStore {
  /**
   * Internal reactive state powered by Svelte 5 runes.
   *
   * The default value is only a safe server fallback until the client bridge is
   * available.
   *
   * @private
   */
  private _state = $state<ThemeState>(DEFAULT_THEME_STATE);

  /**
   * Creates the theme runtime.
   *
   * On the client, the initial state is pulled from the bootstrapper and a single
   * event listener keeps the reactive state synchronized afterwards.
   */
  constructor() {
    if (typeof window === "undefined") {
      return;
    }

    this._state = this.get();

    this.subscribe((newState) => {
      this._state = newState;
    });
  }

  /**
   * Returns the current runtime state as a reactive getter.
   */
  public get state(): ThemeState {
    return this._state;
  }

  /**
   * Returns the current saved theme preference as a reactive getter.
   *
   * It can be "light", "dark", or "system".
   */
  public get current(): ThemePreference {
    return this._state.theme;
  }

  /**
   * Returns the resolved document theme as a reactive getter.
   *
   * It can be "light" or "dark".
   */
  public get resolved(): ThemeResolved {
    return this._state.resolved;
  }

  /**
   * Reads the full runtime state from the browser bridge.
   *
   * If the bridge is unavailable or returns invalid data, a safe default state is
   * returned instead.
   */
  public get(): ThemeState {
    if (typeof window !== "undefined") {
      const nextState = window.__varavelUiTheme?.get();
      if (isThemeState(nextState)) {
        return nextState;
      }
    }

    return { ...DEFAULT_THEME_STATE };
  }

  /**
   * Persists and applies a theme preference through the browser bridge.
   *
   * Invalid values are ignored.
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
   * Subscribes to the full runtime state.
   *
   * Use this when both the saved preference and the resolved document theme are
   * needed.
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
 * Reactive theme runtime singleton.
 */
export const theme = new ThemeStore();
