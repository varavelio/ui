<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Popover as BitsPopover } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the popover content.
     */
    class?: ClassValue;
    /**
     * Controls the open state of the popover.
     */
    open?: boolean;
    /**
     * Optional heading for the popover.
     */
    title?: string;
    /**
     * The snippet for the trigger element.
     */
    trigger?: Snippet;
    /**
     * The main content of the popover.
     */
    children?: Snippet;
    /**
     * The maximum width of the popover.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * If true, adds standard padding (p-4) to the content area.
     * @default true
     */
    padded?: boolean;
    /**
     * The preferred side to render the popover.
     * @default "bottom"
     */
    side?: "top" | "bottom" | "left" | "right";
  }

  let {
    class: className,
    open = $bindable(false),
    title,
    trigger,
    children,
    size = "md",
    padded = true,
    side = "bottom",
  }: Props = $props();
</script>

<BitsPopover.Root bind:open>
  <BitsPopover.Trigger class="w-fit">{@render trigger?.()}</BitsPopover.Trigger>

  <BitsPopover.Portal>
    <BitsPopover.Content
      {side}
      class={cn(
        "bg-base-100 z-50 w-[calc(100vw-2rem)] max-h-[70dvh] max-w-[70dvw] overflow-auto rounded-lg border border-base-400 shadow-sm",
        {
          "max-w-xs": size === "sm",
          "max-w-sm": size === "md",
          "max-w-md": size === "lg",
        },
        className,
      )}
      sideOffset={8}
    >
      {#if title}
        <div class="border-b border-base-400 px-4 py-2">
          <h3 class="text-sm font-medium text-content">{title}</h3>
        </div>
      {/if}

      <div class={cn(padded && "p-4")}>{@render children?.()}</div>
    </BitsPopover.Content>
  </BitsPopover.Portal>
</BitsPopover.Root>
