<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

  const cardPaddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  } as const;

  const cardColors = {
    default: "bg-base-200 text-content",
    muted: "bg-base-300 text-content",
    contrast: "bg-content text-base-100",
  } as const;

  const cardRadii = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  } as const;

  const cardShadows = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  } as const;

  /**
   * Internal spacing preset for the card.
   */
  type CardPadding = keyof typeof cardPaddings;

  /**
   * Surface color for the card.
   */
  type CardColor = keyof typeof cardColors;

  /**
   * Corner radius preset for the card.
   */
  type CardRadius = keyof typeof cardRadii;

  /**
   * Elevation shadow preset for the card.
   */
  type CardShadow = keyof typeof cardShadows;

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Inner content of the card.
     */
    children?: Snippet;

    /**
     * Internal spacing preset.
     * @default "md"
     */
    padding?: CardPadding;

    /**
     * Surface color variant.
     * @default "default"
     */
    color?: CardColor;

    /**
     * Corner radius preset.
     * @default "lg"
     */
    radius?: CardRadius;

    /**
     * Elevation shadow preset.
     * @default "none"
     */
    shadow?: CardShadow;

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
    color = "default",
    radius = "lg",
    shadow = "none",
    bordered = true,
    ...restProps
  }: Props = $props();
</script>

<div
  {...restProps}
  class={cn(
    // Base layout
    "relative overflow-hidden transition-all duration-200",
    // Presets
    cardPaddings[padding],
    cardColors[color],
    cardRadii[radius],
    cardShadows[shadow],
    // Border logic
    bordered ? "border border-base-400" : "border-transparent",
    className,
  )}
>
  {@render children?.()}
</div>
