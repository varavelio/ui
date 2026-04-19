import { createContext } from "svelte";

/**
 * Represents the state of the App Layout, managing sidebar visibility and toggle states.
 */
class AppLayoutState {
  /** Whether a sidebar component is currently present in the layout. */
  hasSidebar = $state(false);
  /** Whether the sidebar is currently open (for mobile view). */
  isSidebarOpen = $state(false);

  /**
   * Toggles the sidebar open/closed state.
   */
  toggleSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

const [getAppLayoutState, setAppLayoutState] = createContext<AppLayoutState>();

export { AppLayoutState, getAppLayoutState, setAppLayoutState };
