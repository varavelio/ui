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
    color?: "neutral" | "info" | "success" | "warning" | "error";
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
      "border-error bg-error text-white": variant === "solid" && color === "error",
      "border-error/15 bg-error/10 text-error": variant === "soft" && color === "error",
      "border-error/30 bg-transparent text-error": variant === "outline" && color === "error",
    },
    className,
  )}
>
  {@render children?.()}
</span>
