<script lang="ts">
  import { Menu } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { Button, Container } from "$lib/components/index.js";
  import { cn } from "$lib/helpers/cn.js";
  import { getAppLayoutState } from "./state.svelte.ts";

  /** Props for the Header component. */
  interface Props {
    /** Additional CSS classes for the header container. */
    class?: ClassValue;
    /** Surface background preset. */
    bg?: "100" | "200" | "300";
    /** Whether the header should render its bottom border. */
    bordered?: boolean;
    /** The layout width max width. */
    maxWidth: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    /** Header left content. */
    headerLeft?: Snippet;
    /** Header center content. */
    headerCenter?: Snippet;
    /** Header right content. */
    headerRight?: Snippet;
  }

  let {
    class: className,
    bg,
    bordered = true,
    maxWidth,
    headerLeft,
    headerCenter,
    headerRight,
  }: Props = $props();

  const state = getAppLayoutState();

  const hasLeft = $derived(state.hasSidebar || !!headerLeft);
  const shouldRenderCenter = $derived(!!headerCenter);
  const shouldRenderLeft = $derived(shouldRenderCenter || hasLeft);
  const shouldRenderRight = $derived(shouldRenderCenter || !!headerRight);
</script>

<header
  class={cn(
    "h-14 shrink-0 min-w-0 overflow-hidden",
    {
      "bg-base-100 text-content": bg === "100",
      "bg-base-200 text-content": bg === "200",
      "bg-base-300 text-content": bg === "300",
      "border-b border-base-400": bordered,
    },
    className,
  )}
>
  <Container
    {maxWidth}
    padded
    class="flex items-center justify-between size-full isolate"
  >
    {#if shouldRenderLeft}
      <div class="flex items-center flex-1 min-w-0 justify-start">
        {#if state.hasSidebar}
          <Button
            square
            variant="ghost"
            size="sm"
            class={cn("desk:hidden flex-none", { "-ml-2 mr-2": !!headerLeft, "-ml-2": !headerLeft })}
            onclick={() => state.toggleSidebarOpen()}
            aria-label="Toggle Navigation"
          >
            <Menu class="size-5" />
          </Button>
        {/if}
        {@render headerLeft?.()}
      </div>
    {/if}

    {#if shouldRenderCenter}
      <div class="flex items-center justify-center flex-none">
        {@render headerCenter?.()}
      </div>
    {/if}

    {#if shouldRenderRight}
      <div class="flex items-center flex-1 min-w-0 justify-end">
        {@render headerRight?.()}
      </div>
    {/if}
  </Container>
</header>
