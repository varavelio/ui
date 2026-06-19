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
    /** Width preset for the desktop sidebar. */
    width?: "sm" | "md" | "lg";
    /** Whether the sidebar can be resized by dragging its right edge (desktop only). */
    sidebarResizable?: boolean;
    /** Sidebar top navigation or content. */
    sidebarTop?: Snippet;
    /** Sidebar center navigation or content. */
    sidebarCenter?: Snippet;
    /** Sidebar bottom navigation or content. */
    sidebarBottom?: Snippet;
  }

  let {
    class: className,
    bg,
    bordered = true,
    width = "md",
    sidebarResizable = false,
    sidebarTop,
    sidebarCenter,
    sidebarBottom,
  }: Props = $props();

  const state = getAppLayoutState();

  // Register the sidebar presence in the layout state
  $effect(() => {
    state.hasSidebar = true;
    return () => {
      state.hasSidebar = false;
    };
  });

  const isUsingDynamicWidth = $derived(
    sidebarResizable && state.sidebarResizableWidth != null,
  );
  const sidebarStyle = $derived(
    isUsingDynamicWidth
      ? `width: ${state.sidebarResizableWidth}px; min-width: 180px; max-width: 40vw`
      : undefined,
  );
  const presetWidthClass = $derived(
    isUsingDynamicWidth
      ? undefined
      : width === "sm"
        ? "w-56"
        : width === "md"
          ? "w-64"
          : "w-80",
  );

  // --- Resize handle logic (desktop only) ---

  const MIN_SIDEBAR_WIDTH = 180;
  const MAX_SIDEBAR_WIDTH_FRACTION = 0.4;

  let resizeStartX = 0;
  let resizeStartWidth = 0;

  function maxSidebarWidth(): number {
    if (typeof window === "undefined") return 480;
    return Math.floor(window.innerWidth * MAX_SIDEBAR_WIDTH_FRACTION);
  }

  function handleResizeStart(e: PointerEvent) {
    if (!sidebarResizable) return;
    e.preventDefault();
    const handle = e.target as HTMLElement;
    const aside = handle.parentElement;
    if (!aside) return;
    const asideRect = aside.getBoundingClientRect();
    resizeStartWidth = e.clientX - asideRect.left;
    resizeStartX = e.clientX;
    state.isResizing = true;
    handle.setPointerCapture(e.pointerId);
  }

  function handleResizeMove(e: PointerEvent) {
    if (!state.isResizing) return;
    const delta = e.clientX - resizeStartX;
    const clamped = Math.max(
      MIN_SIDEBAR_WIDTH,
      Math.min(maxSidebarWidth(), resizeStartWidth + delta),
    );
    state.setSidebarResizableWidth(clamped);
  }

  function handleResizeEnd(_e: PointerEvent) {
    state.isResizing = false;
  }

  function handleResizeDoubleClick() {
    state.setSidebarResizableWidth(null);
  }
</script>

<aside
  style={sidebarStyle}
  class={cn(
    "hidden shrink-0 min-h-0 desk:block relative",
    presetWidthClass,
    {
      "bg-base-100 text-content": bg === "100",
      "bg-base-200 text-content": bg === "200",
      "bg-base-300 text-content": bg === "300",
      "border-r border-base-400": bordered,
    },
    className,
  )}
>
  {#if sidebarResizable}
    <div
      class={cn(
        "hidden desk:block absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10 bg-transparent hover:bg-info/20 transition-colors",
        { "bg-info/30": state.isResizing },
      )}
      role="separator"
      aria-label="Resize sidebar"
      aria-valuenow={state.sidebarResizableWidth ?? MIN_SIDEBAR_WIDTH}
      aria-valuemin={MIN_SIDEBAR_WIDTH}
      aria-valuemax={maxSidebarWidth()}
      tabindex="-1"
      onpointerdown={handleResizeStart}
      onpointermove={handleResizeMove}
      onpointerup={handleResizeEnd}
      ondblclick={handleResizeDoubleClick}
    ></div>
  {/if}

  <div class="flex h-full min-w-0 flex-col isolate">
    {#if sidebarTop}
      <div class="p-4 shrink-0">{@render sidebarTop()}</div>
    {/if}
    {#if sidebarCenter}
      <div
        class={[
          "flex-1 min-h-0 overflow-x-hidden overflow-y-auto px-4",
          {
            "pt-4": !sidebarTop,
            "pb-4": !sidebarBottom,
          }
        ]}
      >
        {@render sidebarCenter()}
      </div>
    {/if}
    {#if sidebarBottom}
      <div class="p-4 shrink-0">{@render sidebarBottom()}</div>
    {/if}
  </div>
</aside>

<div class="desk:hidden">
  <Sheet
    bind:open={state.isSidebarOpen}
    size="sm"
    padded={false}
    class={cn(
      "isolate",
      {
        "bg-base-100 text-content": bg === "100",
        "bg-base-200 text-content": bg === "200",
        "bg-base-300 text-content": bg === "300",
        "border-transparent": !bordered,
      }
    )}
  >
    <div class="flex h-[100dvh] min-w-0 flex-col isolate">
      {#if sidebarTop}
        <div class="p-4 shrink-0">{@render sidebarTop()}</div>
      {/if}
      {#if sidebarCenter}
        <div
          class={[
            "flex-1 min-h-0 overflow-x-hidden overflow-y-auto px-4",
            {
              "pt-4": !sidebarTop,
              "pb-4": !sidebarBottom,
            }
          ]}
        >
          {@render sidebarCenter()}
        </div>
      {/if}
      {#if sidebarBottom}
        <div class="p-4 shrink-0">{@render sidebarBottom()}</div>
      {/if}
    </div>
  </Sheet>
</div>
