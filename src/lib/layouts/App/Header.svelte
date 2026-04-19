<script lang="ts">
  import { Menu } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { Button } from "$lib/components/index.js";
  import { cn } from "$lib/helpers/cn.js";
  import { getAppLayoutState } from "./state.svelte.ts";

  /** Props for the Header component. */
  interface Props {
    /** Additional CSS classes for the header container. */
    class?: ClassValue;
    /** Header content. */
    children: Snippet;
  }

  let { class: className, children }: Props = $props();

  const state = getAppLayoutState();
</script>

<header
  class={cn(
    "flex h-14 shrink-0 items-center gap-4 border-b border-base-400 px-4",
    className,
  )}
>
  {#if state.hasSidebar}
    <Button
      square
      variant="ghost"
      size="sm"
      class="-ml-2 desk:hidden"
      onclick={() => state.toggleSidebarOpen()}
      aria-label="Toggle Navigation"
    >
      <Menu class="size-6" />
    </Button>
  {/if}

  {@render children()}
</header>
