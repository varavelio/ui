<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

  const badgeSizes = {
    sm: "h-5 px-2 text-[11px]",
    md: "h-6 px-2.5 text-xs",
    lg: "h-7 px-3 text-sm",
  } as const;

  const badgeStyles = {
    solid: {
      neutral: "border-content bg-content text-base-100",
      info: "border-info bg-info text-white",
      success: "border-success bg-success text-black",
      warning: "border-warning bg-warning text-black",
      danger: "border-error bg-error text-white",
    },
    soft: {
      neutral: "border-base-400 bg-base-300 text-content",
      info: "border-info/15 bg-info/10 text-info",
      success: "border-success/15 bg-success/10 text-success",
      warning: "border-warning/25 bg-warning/10 text-warning dark:text-warning",
      danger: "border-error/15 bg-error/10 text-error",
    },
    outline: {
      neutral: "border-base-400 bg-transparent text-content",
      info: "border-info/30 bg-transparent text-info",
      success: "border-success/30 bg-transparent text-success",
      warning:
        "border-warning/40 bg-transparent text-warning dark:text-warning",
      danger: "border-error/30 bg-transparent text-error",
    },
  } as const;

  /**
   * Compactness preset for the badge.
   */
  type BadgeSize = keyof typeof badgeSizes;

  /**
   * Presentation style for the badge.
   */
  type BadgeVariant = keyof typeof badgeStyles;

  /**
   * Semantic color for the badge.
   */
  type BadgeColor = keyof (typeof badgeStyles)["solid"];

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Inner content of the badge.
     */
    children?: Snippet;

    /**
     * Compactness preset for the badge.
     *
     * @default "md"
     */
    size?: BadgeSize;

    /**
     * Presentation style.
     *
     * @default "soft"
     */
    variant?: BadgeVariant;

    /**
     * Semantic color representing the badge's intent.
     *
     * @default "neutral"
     */
    color?: BadgeColor;
  }

  let {
    class: className,
    children,
    size = "md",
    variant = "soft",
    color = "neutral",
    ...restProps
  }: Props = $props();
</script>

<span
  class={cn(
    "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap",
    badgeSizes[size],
    badgeStyles[variant][color],
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</span>
