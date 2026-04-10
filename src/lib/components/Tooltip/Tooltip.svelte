<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Tooltip as BitsTooltip } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the trigger element.
     */
    triggerClass?: ClassValue;
    /**
     * Additional CSS classes to apply to the tooltip content box.
     */
    contentClass?: ClassValue;
    /**
     * Tooltip content. Can be a string or a Svelte snippet for rich content.
     */
    content?: string | Snippet;
    /**
     * The element that triggers the tooltip on hover or focus.
     */
    children?: Snippet;
    /**
     * Time in milliseconds before the tooltip opens.
     * @default 0
     */
    delay?: number;
    /**
     * If true, prevents the tooltip from opening.
     * @default false
     */
    disabled?: boolean;
    /**
     * The preferred side to render the tooltip.
     * @default "top"
     */
    side?: "top" | "bottom" | "left" | "right";
    /**
     * If true, adds standard padding (px-3 py-2) to the content area.
     * @default true
     */
    padded?: boolean;
  }

  let {
    triggerClass,
    contentClass,
    content,
    children,
    delay = 0,
    disabled = false,
    side = "top",
    padded = true,
  }: Props = $props();
</script>

<BitsTooltip.Root delayDuration={delay} {disabled}>
  <BitsTooltip.Trigger
    class={cn(
      "focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content inline-flex outline-hidden",
      triggerClass ?? "",
    )}
  >
    {@render children?.()}
  </BitsTooltip.Trigger>

  <BitsTooltip.Portal>
    <BitsTooltip.Content {side} class="z-50" sideOffset={8}>
      <div
        class={cn(
          "bg-base-100 max-h-[70dvh] max-w-[70dvw] overflow-auto rounded-md border border-base-400 text-sm text-content shadow-sm",
          padded && "px-4 py-2",
          contentClass,
        )}
      >
        {#if typeof content === "string"}
          {content}
        {:else if content}
          {@render content()}
        {/if}
      </div>
    </BitsTooltip.Content>
  </BitsTooltip.Portal>
</BitsTooltip.Root>
