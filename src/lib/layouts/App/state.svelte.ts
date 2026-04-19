import { createContext } from "svelte";

/**
 * Represents the state of the App Layout, managing sidebar visibility and toggle states.
 */
class AppLayoutState {
  /** Whether a header component is currently present in the layout. */
  hasHeader = $state(false);
  /** Whether a sidebar component is currently present in the layout. */
  hasSidebar = $state(false);
  /** Whether the sidebar is currently open (for mobile view). */
  isSidebarOpen = $state(false);
  /** Whether the sidebar is in a minimized/collapsed state (for desktop view). */
  isSidebarMinimized = $state(false);

  /**
   * Toggles the sidebar open/closed state.
   */
  toggleSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  /**
   * Toggles the sidebar minimized/collapsed state.
   */
  toggleSidebarMinimized() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}

const [getAppLayoutState, setAppLayoutState] = createContext<AppLayoutState>();

export { AppLayoutState, getAppLayoutState, setAppLayoutState };
