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
    /** Header content. */
    children: Snippet;
  }

  let {
    class: className,
    bg,
    bordered = true,
    maxWidth,
    children,
  }: Props = $props();

  const state = getAppLayoutState();
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
  <Container size={maxWidth} padded class="flex items-center size-full">
    {#if state.hasSidebar}
      <Button
        square
        variant="ghost"
        size="sm"
        class="desk:hidden -ml-2 mr-2 flex-none"
        onclick={() => state.toggleSidebarOpen()}
        aria-label="Toggle Navigation"
      >
        <Menu class="size-5" />
      </Button>
    {/if}
    {@render children()}
  </Container>
</header>
