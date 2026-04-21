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
}

const [getAppLayoutState, setAppLayoutState] = createContext<AppLayoutState>();

export { AppLayoutState, getAppLayoutState, setAppLayoutState };
