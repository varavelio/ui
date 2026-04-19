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
    /** Header surface background preset. (default 100) */
    headerBg?: "100" | "200" | "300";
    /** Sidebar surface background preset. (default 100) */
    sidebarBg?: "100" | "200" | "300";
    /** Main surface background preset. (default 100) */
    mainBg?: "100" | "200" | "300";
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
    headerBg = "100",
    sidebarBg = "100",
    mainBg = "100",
    header,
    sidebar,
    main,
  }: Props = $props();

  setAppLayoutState(new AppLayoutState());
</script>

{#if primaryRegion==="header"}
  <div
    class={cn(
      "relative flex h-dvh w-dvw flex-1 min-w-0 min-h-0 flex-col overflow-hidden",
      className,
    )}
  >
    {#if header}
      <Header bg={headerBg} {maxWidth}>{@render header()}</Header>
    {/if}

    {#if sidebar}
      <div
        class={cn(
          "pointer-events-none absolute bottom-0 hidden desk:block",
          {
            "left-0 right-1/2": !!main,
            "left-0 right-0": !main,
            "top-14": !!header,
            "top-0": !header,
            "bg-base-100": sidebarBg === "100",
            "bg-base-200": sidebarBg === "200",
            "bg-base-300": sidebarBg === "300",
          },
        )}
      ></div>
    {/if}

    {#if main}
      <div
        class={cn(
          "pointer-events-none absolute bottom-0 hidden desk:block",
          {
            "left-1/2 right-0": !!sidebar,
            "left-0 right-0": !sidebar,
            "top-14": !!header,
            "top-0": !header,
            "bg-base-100": mainBg === "100",
            "bg-base-200": mainBg === "200",
            "bg-base-300": mainBg === "300",
          },
        )}
      ></div>
    {/if}

    <Container
      size={maxWidth}
      class="relative z-10 flex flex-1 min-w-0 min-h-0 overflow-hidden"
    >
      {#if sidebar}
        <Sidebar bg={sidebarBg} class="desk:h-[calc(100dvh-3.5rem)]">
          {@render sidebar()}
        </Sidebar>
      {/if}

      <Main bg={mainBg}>{@render main?.()}</Main>
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
        class={cn(
          "pointer-events-none absolute top-0 right-0 hidden h-14 border-b border-base-400 desk:block",
          {
            "left-1/2": !!sidebar,
            "left-0": !sidebar,
            "bg-base-100": headerBg === "100",
            "bg-base-200": headerBg === "200",
            "bg-base-300": headerBg === "300",
          },
        )}
      ></div>
    {/if}

    {#if sidebar}
      <div
        class={cn(
          "pointer-events-none absolute inset-y-0 left-0 hidden desk:block",
          {
            "right-1/2": !!main,
            "right-0": !main,
            "bg-base-100": sidebarBg === "100",
            "bg-base-200": sidebarBg === "200",
            "bg-base-300": sidebarBg === "300",
          },
        )}
      ></div>
    {/if}

    {#if main}
      <div
        class={cn(
          "pointer-events-none absolute right-0 bottom-0 hidden desk:block",
          {
            "left-1/2": !!sidebar,
            "left-0": !sidebar,
            "top-14": !!header,
            "top-0": !header,
            "bg-base-100": mainBg === "100",
            "bg-base-200": mainBg === "200",
            "bg-base-300": mainBg === "300",
          },
        )}
      ></div>
    {/if}

    <Container
      size={maxWidth}
      class="relative z-10 flex size-full min-h-0 min-w-0 justify-start overflow-hidden"
    >
      {#if sidebar}
        <Sidebar bg={sidebarBg} class="desk:h-dvh">{@render sidebar()}</Sidebar>
      {/if}

      <div class="flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden">
        {#if header}
          <Header bg={headerBg} {maxWidth}>{@render header()}</Header>
        {/if}

        <Main bg={mainBg}>{@render main?.()}</Main>
      </div>
    </Container>
  </div>
{/if}
