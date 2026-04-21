<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import Sheet from "$lib/components/Sheet/Sheet.svelte";
  import { cn } from "$lib/helpers/cn.js";
  import { getAppLayoutState } from "./state.svelte.ts";

  /** Props for the Sidebar component. */
  interface Props {
    /** Additional CSS classes for the desktop sidebar and mobile sheet. */
    class?: ClassValue;
    /** Surface background preset. */
    bg?: "100" | "200" | "300";
    /** Whether the sidebar should render its right border. */
    bordered?: boolean;
    /** Width preset for the desktop sidebar. */
    width?: "sm" | "md" | "lg";
    /** Sidebar top navigation or content. */
    sidebarTop?: Snippet;
    /** Sidebar center navigation or content. */
    sidebarCenter?: Snippet;
    /** Sidebar bottom navigation or content. */
    sidebarBottom?: Snippet;
  }

  let {
    class: className,
    bg,
    bordered = true,
    width = "md",
    sidebarTop,
    sidebarCenter,
    sidebarBottom,
  }: Props = $props();

  const state = getAppLayoutState();

  // Register the sidebar presence in the layout state
  $effect(() => {
    state.hasSidebar = true;
    return () => {
      state.hasSidebar = false;
    };
  });
</script>

<aside
  class={cn(
    "hidden shrink-0 min-h-0 desk:block",
    {
      "w-56": width === "sm",
      "w-64": width === "md",
      "w-80": width === "lg",
      "bg-base-100 text-content": bg === "100",
      "bg-base-200 text-content": bg === "200",
      "bg-base-300 text-content": bg === "300",
      "border-r border-base-400": bordered,
    },
    className,
  )}
>
  <div class="flex h-full min-w-0 flex-col isolate">
    {#if sidebarTop}
      <div class="p-4 shrink-0">{@render sidebarTop()}</div>
    {/if}
    {#if sidebarCenter}
      <div class="flex-1 min-h-0 overflow-x-hidden overflow-y-auto p-4">
        {@render sidebarCenter()}
      </div>
    {/if}
    {#if sidebarBottom}
      <div class="p-4 shrink-0">{@render sidebarBottom()}</div>
    {/if}
  </div>
</aside>

<div class="desk:hidden">
  <Sheet
    bind:open={state.isSidebarOpen}
    size="sm"
    padded={false}
    class={cn(
      "isolate",
      {
        "bg-base-100 text-content": bg === "100",
        "bg-base-200 text-content": bg === "200",
        "bg-base-300 text-content": bg === "300",
        "border border-base-400": bordered,
        "border-transparent": !bordered,
      }
    )}
  >
    <div class="flex h-[100dvh] min-w-0 flex-col isolate">
      {#if sidebarTop}
        <div class="p-4 pr-12 shrink-0">{@render sidebarTop()}</div>
      {/if}
      {#if sidebarCenter}
        <div class="flex-1 min-h-0 overflow-x-hidden overflow-y-auto p-4">
          {@render sidebarCenter()}
        </div>
      {/if}
      {#if sidebarBottom}
        <div class="p-4 shrink-0">{@render sidebarBottom()}</div>
      {/if}
    </div>
  </Sheet>
</div>
