<script lang="ts">
  import { Menu } from "@lucide/svelte";
  import type { ClassValue } from "svelte/elements";
  import { Button } from "$lib/components/index.js";
  import { cn } from "$lib/helpers/cn.js";
  import { getAppLayoutState } from "./state.svelte.ts";

  /** Props for the SidebarTrigger component. */
  interface Props {
    /** Additional CSS classes for the trigger button. */
    class?: ClassValue;
  }

  let { class: className }: Props = $props();

  const state = getAppLayoutState();
</script>
{#if state.hasSidebar}
  <Button
    square
    variant="ghost"
    size="sm"
    class={cn("desk:hidden -ml-2", className)}
    onclick={() => state.toggleSidebarOpen()}
    aria-label="Toggle Navigation"
  >
    <Menu class="size-5" />
  </Button>
{/if}
