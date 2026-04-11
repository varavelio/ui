<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { ScrollArea as BitsScrollArea } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the scroll area root.
     */
    class?: ClassValue;
    /**
     * Additional CSS classes to apply to the viewport container.
     */
    viewportClass?: ClassValue;
    /**
     * The content to be scrolled.
     */
    children?: Snippet;
    /**
     * Which scrollbars to render.
     * @default "vertical"
     */
    orientation?: "vertical" | "horizontal" | "both";
    /**
     * Scrollbar visibility behavior.
     * @default "hover"
     */
    type?: "hover" | "scroll" | "auto" | "always";
    /**
     * Time in milliseconds before scrollbars are hidden after scrolling stops.
     * @default 600
     */
    scrollHideDelay?: number;
  }

  let {
    class: className,
    viewportClass,
    children,
    orientation = "vertical",
    type = "hover",
    scrollHideDelay = 600,
  }: Props = $props();
</script>

<BitsScrollArea.Root
  class={cn("relative flex min-h-0 flex-col overflow-hidden", className ?? "")}
  {scrollHideDelay}
  {type}
>
  <BitsScrollArea.Viewport
    class={cn("min-h-0 w-full flex-1", viewportClass ?? "")}
  >
    {@render children?.()}
  </BitsScrollArea.Viewport>

  {#if orientation === "vertical" || orientation === "both"}
    <BitsScrollArea.Scrollbar
      class="flex w-2.5 touch-none select-none rounded-full p-px transition-all hover:w-3"
      orientation="vertical"
    >
      <BitsScrollArea.Thumb class="flex-1 rounded-full bg-base-400" />
    </BitsScrollArea.Scrollbar>
  {/if}

  {#if orientation === "horizontal" || orientation === "both"}
    <BitsScrollArea.Scrollbar
      class="flex h-2.5 touch-none select-none rounded-full p-px transition-all hover:h-3"
      orientation="horizontal"
    >
      <BitsScrollArea.Thumb class="rounded-full bg-base-400" />
    </BitsScrollArea.Scrollbar>
  {/if}

  <BitsScrollArea.Corner class="bg-base-300" />
</BitsScrollArea.Root>
