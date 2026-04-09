<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

  const kbdSizes = {
    sm: "h-5 px-1.5 text-[10px]",
    md: "h-6 px-2 text-[11px]",
    lg: "h-7 px-2.5 text-xs",
  } as const;

  /**
   * Compactness preset for the keyboard key.
   */
  type KbdSize = keyof typeof kbdSizes;

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Inner content of the keyboard key (e.g., "⌘", "Shift", "K").
     */
    children?: Snippet;

    /**
     * Compactness preset for the keyboard key.
     * @default "md"
     */
    size?: KbdSize;
  }

  let {
    class: className,
    children,
    size = "md",
    ...restProps
  }: Props = $props();
</script>

<kbd
  {...restProps}
  class={cn(
    // Base layout & typography
    "inline-flex items-center justify-center rounded-sm border border-base-400 bg-base-200 font-mono font-medium text-content-muted shadow-[0_1px_0_0_rgba(0,0,0,0.1)]",
    // Presets
    kbdSizes[size],
    className,
  )}
>
  {@render children?.()}
</kbd>
