<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The maximum width of the container. */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    /** Adds responsive horizontal padding (px-4 on mobile, px-8 on desktop). */
    padded?: boolean;
    /** The horizontal alignment of the container within its parent. */
    align?: "left" | "center" | "right";
    /** Additional CSS classes to apply to the container. */
    class?: string;
    /** The content to be rendered inside the container. */
    children?: Snippet;
  }

  let {
    size = "md",
    padded = false,
    align = "center",
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<div
  class={cn(
    "w-full",
    {
      "px-4 desk:px-8": padded,
      "mr-auto": align === "left",
      "mx-auto": align === "center",
      "ml-auto": align === "right",
      "max-w-md": size === "xs", /* 28rem = 448px */
      "max-w-3xl": size === "sm",/* 48rem = 768px */
      "max-w-6xl": size === "md", /* 72rem = 1152px */
      "max-w-360": size === "lg", /* 90rem = 1440px */
      "max-w-480": size === "xl", /* 120rem = 1920px */
    },
    className
  )}
  {...rest}
>
  {@render children?.()}
</div>
