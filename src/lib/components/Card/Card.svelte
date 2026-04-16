<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Inner content of the card.
     */
    children?: Snippet;

    /**
     * Internal spacing preset.
     * @default "md"
     */
    padding?: "none" | "sm" | "md" | "lg";

    /**
     * Surface background preset.
     * @default "200"
     */
    bg?: "100" | "200" | "300" | "contrast";

    /**
     * Corner radius preset.
     * @default "lg"
     */
    radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";

    /**
     * Elevation shadow preset.
     * @default "sm"
     */
    shadow?: "none" | "sm" | "md" | "lg";

    /**
     * Whether the card should have a visible border.
     * @default true
     */
    bordered?: boolean;
  }

  let {
    class: className,
    children,
    padding = "md",
    bg = "200",
    radius = "lg",
    shadow = "sm",
    bordered = true,
    ...restProps
  }: Props = $props();
</script>

<div
  {...restProps}
  class={cn(
    // Base layout
    "relative overflow-hidden transition-all duration-200",
    {
      // Padding presets
      "p-0": padding === "none",
      "p-3": padding === "sm",
      "p-5": padding === "md",
      "p-8": padding === "lg",

      // Background variants
      "bg-base-100 text-content": bg === "100",
      "bg-base-200 text-content": bg === "200",
      "bg-base-300 text-content": bg === "300",
      "bg-content text-base-100": bg === "contrast",

      // Radius presets
      "rounded-none": radius === "none",
      "rounded-sm": radius === "sm",
      "rounded-md": radius === "md",
      "rounded-lg": radius === "lg",
      "rounded-xl": radius === "xl",
      "rounded-2xl": radius === "2xl",

      // Shadow presets
      "shadow-none": shadow === "none",
      "shadow-sm": shadow === "sm",
      "shadow-md": shadow === "md",
      "shadow-lg": shadow === "lg",

      // Border logic
      "border border-base-400": bordered,
      "border-transparent": !bordered,
    },
    className,
  )}
>
  {@render children?.()}
</div>
