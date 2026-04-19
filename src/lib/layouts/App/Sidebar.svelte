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
    /** Sidebar navigation or content. */
    children: Snippet;
  }

  let { class: className, bg, bordered = true, children }: Props = $props();

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
    "hidden w-64 shrink-0 min-h-0 overflow-x-hidden overflow-y-auto p-4 desk:block",
    {
      "bg-base-100 text-content": bg === "100",
      "bg-base-200 text-content": bg === "200",
      "bg-base-300 text-content": bg === "300",
      "border-r border-base-400": bordered,
    },
    className,
  )}
>
  <div class="flex min-h-full min-w-0 flex-col">{@render children()}</div>
</aside>

<div class="desk:hidden">
  <Sheet
    bind:open={state.isSidebarOpen}
    size="sm"
    class={cn({
      "bg-base-100 text-content": bg === "100",
      "bg-base-200 text-content": bg === "200",
      "bg-base-300 text-content": bg === "300",
      "border border-base-400": bordered,
      "border-transparent": !bordered,
    })}
  >
    {@render children()}
  </Sheet>
</div>
