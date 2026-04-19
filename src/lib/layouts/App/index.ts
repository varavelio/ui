import type { ComponentProps } from "svelte";
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

export namespace AppLayoutTypes {
  export type RootProps = ComponentProps<typeof AppLayout.Root>;
  export type HeaderProps = ComponentProps<typeof AppLayout.Header>;
  export type SidebarProps = ComponentProps<typeof AppLayout.Sidebar>;
  export type MainProps = ComponentProps<typeof AppLayout.Main>;
}
