<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import Sheet from "$lib/components/Sheet/Sheet.svelte";
  import { cn } from "$lib/helpers/cn.js";
  import { getAppLayoutState } from "./state.svelte.ts";

  interface Props {
    class?: ClassValue;
    children: Snippet;
  }

  let { class: className, children }: Props = $props();

  const state = getAppLayoutState();

  // Register the presence of the sidebar
  $effect(() => {
    state.hasSidebar = true;
    return () => {
      state.hasSidebar = false;
    };
  });
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
  <Sheet bind:open={state.isSidebarOpen}>{@render children()}</Sheet>
</div>
