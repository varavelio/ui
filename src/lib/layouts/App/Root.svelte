<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { Container } from "$lib/components/index.js";
  import { cn } from "$lib/helpers/cn.js";
  import Header from "./Header.svelte";
  import Main from "./Main.svelte";
  import Sidebar from "./Sidebar.svelte";
  import { AppLayoutState, setAppLayoutState } from "./state.svelte.ts";

  /** Props for the Root component. */
  interface Props {
    /** Additional CSS classes to apply to the root layout container. */
    class?: ClassValue;
    /** The primary region of the layout, which can be either "header" or "sidebar". */
    primaryRegion?: "header" | "sidebar";
    /** The layout width max width. */
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    /** The header content to be rendered within the layout. */
    header?: Snippet;
    /** The sidebar content to be rendered within the layout. */
    sidebar?: Snippet;
    /** The main content to be rendered within the layout. */
    main?: Snippet;
  }

  let {
    class: className,
    primaryRegion = "header",
    maxWidth = "xl",
    header,
    sidebar,
    main,
  }: Props = $props();

  setAppLayoutState(new AppLayoutState());
</script>

{#if primaryRegion==="header"}
  <div
    class={cn(
      "flex h-dvh w-dvw flex-1 min-w-0 min-h-0 flex-col overflow-hidden",
      className,
    )}
  >
    {#if header}
      <Header {maxWidth}>{@render header()}</Header>
    {/if}

    <Container
      size={maxWidth}
      class="flex flex-1 min-w-0 min-h-0 overflow-hidden"
    >
      {#if sidebar}
        <Sidebar class="desk:h-[calc(100dvh-3.5rem)]">
          {@render sidebar()}
        </Sidebar>
      {/if}

      <Main>{@render main?.()}</Main>
    </Container>
  </div>
{/if}

{#if primaryRegion==="sidebar"}
  <div
    class={cn(
      "relative flex h-dvh w-dvw flex-1 min-w-0 min-h-0 overflow-hidden",
      className,
    )}
  >
    {#if header && sidebar}
      <div
        class="pointer-events-none absolute top-0 right-0 left-1/2 hidden h-14 border-b border-base-400 desk:block"
      ></div>
    {/if}

    <Container
      size={maxWidth}
      class="relative z-10 flex size-full min-h-0 min-w-0 justify-start overflow-hidden"
    >
      {#if sidebar}
        <Sidebar class="desk:h-dvh">{@render sidebar()}</Sidebar>
      {/if}

      <div class="flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden">
        {#if header}
          <Header {maxWidth}>{@render header()}</Header>
        {/if}

        <Main>{@render main?.()}</Main>
      </div>
    </Container>
  </div>
{/if}
