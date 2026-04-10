<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

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
    size?: "sm" | "md" | "lg";

    /**
     * Presentation style.
     *
     * @default "soft"
     */
    variant?: "solid" | "soft" | "outline";

    /**
     * Semantic color representing the badge's intent.
     *
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "danger";
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
  {...restProps}
  class={cn(
    "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap",
    {
      // Size presets
      "h-5 px-2 text-[11px]": size === "sm",
      "h-6 px-2.5 text-xs": size === "md",
      "h-7 px-3 text-sm": size === "lg",

      // Variant: Solid
      "border-content bg-content text-base-100": variant === "solid" && color === "neutral",
      "border-info bg-info text-white": variant === "solid" && color === "info",
      "border-success bg-success text-white": variant === "solid" && color === "success",
      "border-warning bg-warning text-white": variant === "solid" && color === "warning",
      "border-error bg-error text-white": variant === "solid" && color === "danger",

      // Variant: Soft
      "border-base-400 bg-base-300 text-content": variant === "soft" && color === "neutral",
      "border-info/15 bg-info/10 text-info": variant === "soft" && color === "info",
      "border-success/15 bg-success/10 text-success": variant === "soft" && color === "success",
      "border-warning/25 bg-warning/10 text-warning dark:text-warning": variant === "soft" && color === "warning",
      "border-error/15 bg-error/10 text-error": variant === "soft" && color === "danger",

      // Variant: Outline
      "border-base-400 bg-transparent text-content": variant === "outline" && color === "neutral",
      "border-info/30 bg-transparent text-info": variant === "outline" && color === "info",
      "border-success/30 bg-transparent text-success": variant === "outline" && color === "success",
      "border-warning/40 bg-transparent text-warning dark:text-warning": variant === "outline" && color === "warning",
      "border-error/30 bg-transparent text-error": variant === "outline" && color === "danger",
    },
    className,
  )}
>
  {@render children?.()}
</span>
