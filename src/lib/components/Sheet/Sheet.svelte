<script lang="ts">
  import { X } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Dialog as BitsDialog } from "bits-ui";
  import { onDestroy, type Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { dialogLayerManager } from "$lib/runtime/dialog/layers.js";
  import { cn } from "../../helpers/cn.ts";

  interface Props {
    /**
     * Additional CSS classes for the sheet panel.
     */
    class?: ClassValue;
    /**
     * Controls the open state.
     */
    open?: boolean;
    /**
     * Short heading shown at the top.
     */
    title?: string;
    /**
     * Supporting text shown below the title.
     */
    description?: string;
    /**
     * Side the sheet opens from.
     * @default "left"
     */
    side?: "left" | "right" | "bottom";
    /**
     * Width or height preset based on the anchored side.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * Whether the sheet can be closed by pressing Escape, interacting outside,
     * or using the close button.
     * @default true
     */
    dismissible?: boolean;
    /**
     * Whether the body receives default padding.
     * @default true
     */
    padded?: boolean;
    /**
     * Trigger content that opens the sheet.
     */
    trigger?: Snippet;
    /**
     * Optional footer content, usually actions.
     */
    footer?: Snippet;
    /**
     * Main sheet content.
     */
    children?: Snippet;
  }

  let {
    class: className,
    open = $bindable(false),
    title,
    description,
    side = "left",
    size = "md",
    dismissible = true,
    padded = true,
    trigger,
    footer,
    children,
  }: Props = $props();

  const layerKey = Symbol("sheet-layer");

  let layer = $derived.by(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    if (!open) {
      dialogLayerManager.unregister(layerKey);
      return 0;
    }

    return dialogLayerManager.register(layerKey);
  });

  onDestroy(() => {
    if (typeof window === "undefined") {
      return;
    }

    dialogLayerManager.unregister(layerKey);
  });

  let overlayStyle = $derived(
    `z-index: ${dialogLayerManager.overlayZIndex(layer)};`,
  );
  let contentStyle = $derived(
    `z-index: ${dialogLayerManager.contentZIndex(layer)};`,
  );
</script>

<BitsDialog.Root bind:open>
  {#if trigger}
    <BitsDialog.Trigger class="w-fit">{@render trigger()}</BitsDialog.Trigger>
  {/if}

  <BitsDialog.Portal>
    <BitsDialog.Overlay
      class="fixed inset-0 bg-black/60"
      style={overlayStyle}
    />

    <BitsDialog.Content
      style={contentStyle}
      class={cn(
				"fixed flex flex-col overflow-hidden bg-base-100 shadow-md outline-none transition-transform duration-200 ease-out motion-reduce:transition-none",
        {
          "border-r border-base-400": side === "left",
          "border-l border-base-400": side === "right",
          "border-t border-base-400": side === "bottom",
          "left-0 top-0 bottom-0 w-[min(100dvw,20rem)] max-w-[80dvw] data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full": side === "left" && size === "sm",
          "left-0 top-0 bottom-0 w-[min(100dvw,32rem)] max-w-[80dvw] data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full": side === "left" && size === "md",
          "left-0 top-0 bottom-0 w-[min(100dvw,40rem)] max-w-[80dvw] data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full": side === "left" && size === "lg",
          "right-0 top-0 bottom-0 w-[min(100dvw,20rem)] max-w-[80dvw] data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full": side === "right" && size === "sm",
          "right-0 top-0 bottom-0 w-[min(100dvw,32rem)] max-w-[80dvw] data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full": side === "right" && size === "md",
          "right-0 top-0 bottom-0 w-[min(100dvw,40rem)] max-w-[80dvw] data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full": side === "right" && size === "lg",
          "bottom-0 left-0 right-0 h-[min(100dvh,16rem)] max-h-[80dvh] w-full data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full": side === "bottom" && size === "sm",
          "bottom-0 left-0 right-0 h-[min(100dvh,24rem)] max-h-[80dvh] w-full data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full": side === "bottom" && size === "md",
          "bottom-0 left-0 right-0 h-[min(100dvh,32rem)] max-h-[80dvh] w-full data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full": side === "bottom" && size === "lg",
        },
				className,
			)}
      escapeKeydownBehavior={dismissible ? "close" : "ignore"}
      interactOutsideBehavior={dismissible ? "close" : "ignore"}
    >
      {#if dismissible}
        <BitsDialog.Close
          class={[
            "focus-visible:outline-2 focus-visible:outline-content",
            "absolute right-4 top-4 z-10 rounded-md p-2 text-content-muted",
            "transition-colors duration-75",
            "hover:bg-base-300 hover:text-content",
            "active:scale-[0.99] active:transition-none"
          ]}
        >
          <X aria-hidden="true" class="size-4" />
          <span class="sr-only">Close sheet</span>
        </BitsDialog.Close>
      {/if}

      {#if title || description}
        <div class="p-4 shrink-0">
          {#if title}
            <BitsDialog.Title class="text-lg font-semibold text-content">
              {title}
            </BitsDialog.Title>
          {/if}
          {#if description}
            <BitsDialog.Description class="text-sm text-content-muted">
              {description}
            </BitsDialog.Description>
          {/if}
        </div>
      {/if}

      {#if children}
        <div class="min-h-0 h-0 flex-1 overflow-auto">
          <div
            class={{ 
              "p-4": padded,
              "pt-0": title || description,
              "pb-0": footer,
            }}
          >
            {@render children()}
          </div>
        </div>
      {/if}

      {#if footer}
        <div class="p-4 shrink-0">{@render footer()}</div>
      {/if}
    </BitsDialog.Content>
  </BitsDialog.Portal>
</BitsDialog.Root>
