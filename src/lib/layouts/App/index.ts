import Header from "./Header.svelte";
import Main from "./Main.svelte";
import Root from "./Root.svelte";
import Sidebar from "./Sidebar.svelte";

export const AppLayout = {
  Root,
  Header,
  Sidebar,
  Main,
} as const;
