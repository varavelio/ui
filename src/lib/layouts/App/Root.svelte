<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { Container } from "$lib/components/index.js";
  import { cn } from "$lib/helpers/cn.js";
  import { appLayoutApi } from "./api.ts";
  import Header from "./Header.svelte";
  import Main from "./Main.svelte";
  import RouteChangeBridge from "./RouteChangeBridge.svelte";
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
    /** Whether the header should render its border. */
    headerBordered?: boolean;
    /** Sidebar surface background preset. (default 100) */
    sidebarBg?: "100" | "200" | "300";
    /** Whether the sidebar should render its border. */
    sidebarBordered?: boolean;
    /** Main surface background preset. (default 100) */
    mainBg?: "100" | "200" | "300";
    /** The header left content to be rendered within the layout. */
    headerLeft?: Snippet;
    /** The header center content to be rendered within the layout. */
    headerCenter?: Snippet;
    /** The header right content to be rendered within the layout. */
    headerRight?: Snippet;
    /** The sidebar top content to be rendered within the layout. */
    sidebarTop?: Snippet;
    /** The sidebar center content to be rendered within the layout. */
    sidebarCenter?: Snippet;
    /** The sidebar bottom content to be rendered within the layout. */
    sidebarBottom?: Snippet;
    /** The main content to be rendered within the layout. */
    main?: Snippet;
    /** Width preset for the desktop sidebar. */
    sidebarWidth?: "sm" | "md" | "lg";
    /** Whether mobile sidebars should automatically close when the current route changes. */
    closeSidebarOnRouteChange?: boolean;
  }

  let {
    class: className,
    primaryRegion = "header",
    maxWidth = "xl",
    headerBg = "100",
    headerBordered = true,
    sidebarBg = "100",
    sidebarBordered = true,
    mainBg = "100",
    headerLeft,
    headerCenter,
    headerRight,
    sidebarTop,
    sidebarCenter,
    sidebarBottom,
    main,
    sidebarWidth = "md",
    closeSidebarOnRouteChange = true,
  }: Props = $props();

  // Check presence of header or sidebar
  let hasHeader = $derived(!!headerLeft || !!headerCenter || !!headerRight);
  let hasSidebar = $derived(!!sidebarTop || !!sidebarCenter || !!sidebarBottom);

  // Initialize the reactive state for this specific AppLayout instance.
  const state = new AppLayoutState();

  // Bridge global API actions to local state mutations.
  const handleSidebarAction = (
    action: "open-sidebar" | "close-sidebar" | "toggle-sidebar",
  ) => {
    if (action === "open-sidebar") {
      state.openSidebar();
      return;
    }

    if (action === "close-sidebar") {
      state.closeSidebar();
      return;
    }

    state.toggleSidebarOpen();
  };

  // Provide the state to child components (Header, Sidebar, etc.) via Svelte context.
  setAppLayoutState(state);

  // Subscribe to the global appLayoutApi to react to programmatic commands
  // (e.g., appLayoutApi.openSidebar()) from anywhere in the application.
  const cleanupControls =
    typeof window === "undefined"
      ? () => {}
      : appLayoutApi.subscribe(handleSidebarAction);

  onDestroy(() => {
    cleanupControls();
  });
</script>

{#if closeSidebarOnRouteChange}
  <RouteChangeBridge {state} />
{/if}

{#if primaryRegion==="header"}
  <div
    class={cn(
      "relative flex h-dvh w-dvw flex-1 min-w-0 min-h-0 flex-col overflow-hidden",
      className,
    )}
  >
    {#if hasHeader}
      <Header
        bg={headerBg}
        bordered={headerBordered}
        {maxWidth}
        {headerLeft}
        {headerCenter}
        {headerRight}
      />
    {/if}

    {#if hasSidebar}
      <div
        class={cn(
          "pointer-events-none absolute bottom-0 hidden desk:block",
          {
            "left-0 right-1/2": !!main,
            "left-0 right-0": !main,
            "top-14": hasHeader,
            "top-0": !hasHeader,
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
            "left-1/2 right-0": hasSidebar,
            "left-0 right-0": !hasSidebar,
            "top-14": hasHeader,
            "top-0": !hasHeader,
            "bg-base-100": mainBg === "100",
            "bg-base-200": mainBg === "200",
            "bg-base-300": mainBg === "300",
          },
        )}
      ></div>
    {/if}

    <Container
      {maxWidth}
      class="relative z-10 flex flex-1 min-w-0 min-h-0 overflow-hidden"
    >
      {#if hasSidebar}
        <Sidebar
          bg={sidebarBg}
          bordered={sidebarBordered}
          width={sidebarWidth}
          class="desk:h-[calc(100dvh-3.5rem)]"
          {sidebarTop}
          {sidebarCenter}
          {sidebarBottom}
        />
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
    {#if hasHeader && hasSidebar}
      <div
        class={cn(
          "pointer-events-none absolute top-0 right-0 hidden h-14 desk:block",
          {
            "left-1/2": hasSidebar,
            "left-0": !hasSidebar,
            "bg-base-100": headerBg === "100",
            "bg-base-200": headerBg === "200",
            "bg-base-300": headerBg === "300",
            "border-b border-base-400": headerBordered,
          },
        )}
      ></div>
    {/if}

    {#if hasSidebar}
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
            "left-1/2": hasSidebar,
            "left-0": !hasSidebar,
            "top-14": hasHeader,
            "top-0": !hasHeader,
            "bg-base-100": mainBg === "100",
            "bg-base-200": mainBg === "200",
            "bg-base-300": mainBg === "300",
          },
        )}
      ></div>
    {/if}

    <Container
      {maxWidth}
      class="relative z-10 flex size-full min-h-0 min-w-0 justify-start overflow-hidden"
    >
      {#if hasSidebar}
        <Sidebar
          bg={sidebarBg}
          bordered={sidebarBordered}
          width={sidebarWidth}
          class="desk:h-dvh"
          {sidebarTop}
          {sidebarCenter}
          {sidebarBottom}
        />
      {/if}

      <div class="flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden">
        {#if hasHeader}
          <Header
            bg={headerBg}
            bordered={headerBordered}
            {maxWidth}
            {headerLeft}
            {headerCenter}
            {headerRight}
          />
        {/if}

        <Main bg={mainBg}>{@render main?.()}</Main>
      </div>
    </Container>
  </div>
{/if}
