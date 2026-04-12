<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Separator as BitsSeparator } from "bits-ui";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  const separatorInsets = {
    none: "",
    sm: "mx-2 data-[orientation=vertical]:my-2",
    md: "mx-4 data-[orientation=vertical]:my-4",
    lg: "mx-8 data-[orientation=vertical]:my-8",
  } as const;

  /**
   * Layout orientation of the separator.
   */
  type SeparatorOrientation = "horizontal" | "vertical";

  /**
   * Internal spacing preset for the separator.
   */
  type SeparatorInset = keyof typeof separatorInsets;

  interface Props {
    /**
     * Additional CSS classes to apply to the separator root element.
     */
    class?: ClassValue;

    /**
     * Orientation of the separator.
     * @default "horizontal"
     */
    orientation?: SeparatorOrientation;

    /**
     * Whether the element is purely decorative.
     * If true, it is hidden from assistive technologies.
     * @default true
     */
    decorative?: boolean;

    /**
     * Internal spacing preset.
     * @default "none"
     */
    inset?: SeparatorInset;
  }

  let {
    class: className,
    orientation = "horizontal",
    decorative = true,
    inset = "none",
  }: Props = $props();
</script>

<BitsSeparator.Root
  {orientation}
  {decorative}
  class={cn(
    // Base layout & surface
    "shrink-0 bg-base-400 transition-all duration-200",
    // Orientation logic
    "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
    // Presets
    separatorInsets[inset],
    className,
  )}
/>
