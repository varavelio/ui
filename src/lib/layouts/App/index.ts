import type { ComponentProps } from "svelte";
import Header from "./Header.svelte";
import Main from "./Main.svelte";
import Root from "./Root.svelte";
import Sidebar from "./Sidebar.svelte";

/**
 * AppLayout compound component for building structured application shells.
 * Provides Root, Header, Sidebar, and Main slots.
 */
export const AppLayout = {
  /** The root container for the application layout. Sets up global state. */
  Root,
  /** The application header, typically used for navigation and actions. */
  Header,
  /** The application sidebar, supports desktop view and mobile sheet view. */
  Sidebar,
  /** The main content area of the application. */
  Main,
} as const;

/**
 * Type definitions for AppLayout component props.
 */
export namespace AppLayoutTypes {
  export type RootProps = ComponentProps<typeof AppLayout.Root>;
  export type HeaderProps = ComponentProps<typeof AppLayout.Header>;
  export type SidebarProps = ComponentProps<typeof AppLayout.Sidebar>;
  export type MainProps = ComponentProps<typeof AppLayout.Main>;
}
