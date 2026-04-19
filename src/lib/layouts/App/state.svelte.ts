import { createContext } from "svelte";

class AppLayoutState {
  hasSidebar = $state(false);
  isSidebarOpen = $state(false);
  isSidebarMinimized = $state(false);

  toggleSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSidebarMinimized() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}

const [getAppLayoutState, setAppLayoutState] = createContext<AppLayoutState>();

export { AppLayoutState, getAppLayoutState, setAppLayoutState };
