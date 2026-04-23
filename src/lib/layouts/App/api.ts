/**
 * Represents the possible actions that can be performed on the AppLayout's mobile sidebar.
 */
export type AppLayoutAction =
  | "open-sidebar"
  | "close-sidebar"
  | "toggle-sidebar";

interface AppLayoutEventDetail {
  action: AppLayoutAction;
}

interface AppLayoutRouteChangeDetail {
  url: string;
}

const APP_LAYOUT_EVENT = "varavel-app-layout";
const APP_LAYOUT_ROUTE_CHANGE_EVENT = "varavel-app-layout-route-change";

declare global {
  interface Window {
    __varavelUiAppLayoutRouteObserverInstalled?: boolean;
    __varavelUiAppLayoutRouteObserverLastUrl?: string;
    __varavelUiAppLayoutRouteObserverIntervalId?: number;
  }
}

/**
 * A singleton API for controlling the global `AppLayout` component state,
 * such as opening and closing the mobile sidebar, from anywhere in the application.
 * It uses native browser events to decouple the layout control from specific frameworks.
 */
class AppLayoutAPI {
  constructor() {
    if (typeof window !== "undefined") {
      this.initRouteObserver();
    }
  }

  /**
   * Opens the mobile sidebar in the currently mounted `AppLayout`.
   * Dispatches a global event that the `AppLayout` listens to.
   */
  openSidebar() {
    this.dispatch("open-sidebar");
  }

  /**
   * Closes the mobile sidebar in the currently mounted `AppLayout`.
   * Dispatches a global event that the `AppLayout` listens to.
   */
  closeSidebar() {
    this.dispatch("close-sidebar");
  }

  /**
   * Toggles the open/closed state of the mobile sidebar.
   * Dispatches a global event that the `AppLayout` listens to.
   */
  toggleSidebar() {
    this.dispatch("toggle-sidebar");
  }

  /**
   * Internal mechanism for the `AppLayout` component to subscribe to
   * incoming control actions.
   *
   * @param callback Function called when an action is dispatched.
   * @returns An unsubscribe function to clean up the event listener.
   */
  subscribe(callback: (action: AppLayoutAction) => void): () => void {
    if (typeof window === "undefined") {
      return () => {};
    }

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;

      if (!this.isAppLayoutEventDetail(detail)) {
        return;
      }

      callback(detail.action);
    };

    window.addEventListener(APP_LAYOUT_EVENT, handler);

    return () => {
      window.removeEventListener(APP_LAYOUT_EVENT, handler);
    };
  }

  /**
   * Internal mechanism to listen to native browser route changes (history
   * updates, popstate, hashchange) across the application.
   *
   * @param callback Function called whenever the URL changes.
   * @returns An unsubscribe function to clean up the event listener.
   */
  onRouteChange(callback: (url: string) => void): () => void {
    if (typeof window === "undefined") {
      return () => {};
    }

    this.initRouteObserver();

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;

      if (!this.isRouteChangeEventDetail(detail)) {
        return;
      }

      callback(detail.url);
    };

    window.addEventListener(APP_LAYOUT_ROUTE_CHANGE_EVENT, handler);

    return () => {
      window.removeEventListener(APP_LAYOUT_ROUTE_CHANGE_EVENT, handler);
    };
  }

  private dispatch(action: AppLayoutAction) {
    if (typeof window === "undefined") {
      return;
    }

    window.dispatchEvent(
      new CustomEvent<AppLayoutEventDetail>(APP_LAYOUT_EVENT, {
        detail: { action },
      }),
    );
  }

  private dispatchRouteChange(url: string) {
    if (typeof window === "undefined") {
      return;
    }

    window.dispatchEvent(
      new CustomEvent<AppLayoutRouteChangeDetail>(
        APP_LAYOUT_ROUTE_CHANGE_EVENT,
        {
          detail: { url },
        },
      ),
    );
  }

  private initRouteObserver() {
    if (
      typeof window === "undefined" ||
      window.__varavelUiAppLayoutRouteObserverInstalled
    ) {
      return;
    }

    window.__varavelUiAppLayoutRouteObserverInstalled = true;
    window.__varavelUiAppLayoutRouteObserverLastUrl = window.location.href;

    const notifyIfRouteChanged = () => {
      const nextUrl = window.location.href;

      if (nextUrl === window.__varavelUiAppLayoutRouteObserverLastUrl) {
        return;
      }

      window.__varavelUiAppLayoutRouteObserverLastUrl = nextUrl;
      this.dispatchRouteChange(nextUrl);
    };

    const queueRouteChangeCheck = () => {
      queueMicrotask(notifyIfRouteChanged);
    };

    window.addEventListener("popstate", queueRouteChangeCheck);
    window.addEventListener("hashchange", queueRouteChangeCheck);
    window.__varavelUiAppLayoutRouteObserverIntervalId = window.setInterval(
      notifyIfRouteChanged,
      120,
    );
  }

  private isAppLayoutEventDetail(
    value: unknown,
  ): value is AppLayoutEventDetail {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    const candidate = value as Record<string, unknown>;

    return (
      candidate.action === "open-sidebar" ||
      candidate.action === "close-sidebar" ||
      candidate.action === "toggle-sidebar"
    );
  }

  private isRouteChangeEventDetail(
    value: unknown,
  ): value is AppLayoutRouteChangeDetail {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    const candidate = value as Record<string, unknown>;

    return typeof candidate.url === "string";
  }
}

/**
 * Singleton instance of the `AppLayoutAPI`.
 * Import this to programmatically control the `AppLayout`
 * anywhere in your app (e.g., `appLayoutApi.closeSidebar()`).
 */
export const appLayoutApi = new AppLayoutAPI();
