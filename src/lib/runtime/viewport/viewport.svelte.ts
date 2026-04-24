/**
 * Viewport Runtime API
 *
 * Provides reactive access to the current viewport state based on the project's
 * single-breakpoint design system (desk: 1024px).
 *
 * This API uses `window.matchMedia` for efficient tracking, ensuring that
 * listeners only fire when a breakpoint threshold is actually crossed.
 */
class Viewport {
  /**
   * The desktop breakpoint query.
   * Matches Tailwind 4 theme definition: --breakpoint-desk: 64rem (1024px).
   */
  private readonly DESKTOP_QUERY = "(min-width: 1024px)";

  /**
   * Tracks whether the viewport runtime has been initialized in the browser.
   * Remains `false` during SSR and flips to `true` after client setup completes.
   */
  #initialized = $state(false);

  /**
   * Reactive state for whether the current viewport is desktop-sized.
   * Defaults to `true` for SSR consistency and initial hydration.
   */
  #isDesktop = $state(true);

  /**
   * Reactive state for the current viewport width in pixels.
   * Defaults to 1024 (desktop) for SSR consistency.
   */
  #width = $state(1024);

  /**
   * Returns `true` once client-side viewport state has been initialized.
   */
  get initialized() {
    return this.#initialized;
  }

  /**
   * Returns the current viewport width in pixels.
   */
  get width() {
    return this.#width;
  }

  /**
   * Returns the current breakpoint name ("mobile" | "desktop").
   */
  get breakpoint(): "mobile" | "desktop" {
    return this.#isDesktop ? "desktop" : "mobile";
  }

  /**
   * Returns true if the viewport is at least 1024px wide.
   */
  get isDesktop() {
    return this.#isDesktop;
  }

  /**
   * Returns true if the viewport is smaller than 1024px wide.
   */
  get isMobile() {
    return !this.#isDesktop;
  }

  constructor() {
    if (typeof window !== "undefined" && !this.#initialized) {
      this.init();
    }
  }

  private init() {
    const mediaQuery = window.matchMedia(this.DESKTOP_QUERY);

    // Initialize state
    this.#isDesktop = mediaQuery.matches;
    this.#width = window.innerWidth;

    // Listen for media query changes (efficiency for isDesktop/isMobile)
    mediaQuery.addEventListener("change", (e) => {
      this.#isDesktop = e.matches;
    });

    // Listen for resize changes (required for exact width tracking)
    let timeout: ReturnType<typeof setTimeout>;
    window.addEventListener("resize", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.#width = window.innerWidth;
      }, 100);
    });

    // Mark as initialized
    this.#initialized = true;
  }
}

/**
 * Singleton instance of the Viewport API.
 * All components share the same reactive state and media query listener.
 */
export const viewport = new Viewport();
