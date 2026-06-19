import { createContext } from "svelte";

/**
 * Internal Svelte 5 state container for the `AppLayout`.
 * It tracks the presence and visibility of the sidebar for mobile views,
 * and is manipulated via the `appLayoutApi` singleton.
 */
class AppLayoutState {
  /** Whether a sidebar component is currently present in the layout. */
  hasSidebar = $state(false);

  /** Whether the sidebar is currently open (for mobile view). */
  isSidebarOpen = $state(false);

  /**
   * Current pixel width of the sidebar when `sidebarResizable` is enabled on the
   * parent `AppLayout`. When `null` the sidebar falls back to the preset
   * width class (`w-56`, `w-64`, `w-80`) configured via `sidebarWidth`.
   */
  sidebarResizableWidth = $state<number | null>(null);

  /** Whether a sidebar resize drag is currently in progress. */
  isResizing = $state(false);

  /**
   * Opens the sidebar.
   */
  openSidebar() {
    this.isSidebarOpen = true;
  }

  /**
   * Closes the sidebar.
   */
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  /**
   * Toggles the sidebar open/closed state.
   */
  toggleSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  /** Persists a new pixel width for the resizable sidebar. Pass `null` to reset. */
  setSidebarResizableWidth(width: number | null) {
    this.sidebarResizableWidth = width;
  }
}

const [getAppLayoutState, setAppLayoutState] = createContext<AppLayoutState>();

export { AppLayoutState, getAppLayoutState, setAppLayoutState };
