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
    /** Sidebar navigation or content. */
    children: Snippet;
  }

  let { class: className, children }: Props = $props();

  const state = getAppLayoutState();
</script>

<aside
  class={cn(
    "hidden w-64 flex-col border-r border-base-400 p-4 desk:flex",
    className,
  )}
>
  {@render children()}
</aside>

<div class="desk:hidden">
  <Sheet bind:open={state.isSidebarOpen} size="sm">{@render children()}</Sheet>
</div>
