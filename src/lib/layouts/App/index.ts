import type { ComponentProps } from "svelte";
import AppLayout from "./Root.svelte";

/**
 * AppLayout compound component for building structured application shells.
 * Provides Root, Header, Sidebar, SidebarTrigger, and Main slots.
 */
export { AppLayout };
export type AppLayoutProps = ComponentProps<typeof AppLayout>;
