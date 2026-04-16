<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLHeadingElement> {
    /** The HTML heading level (h1-h6) */
    level?: "1" | "2" | "3" | "4" | "5" | "6";
    /** The visual size preset */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    /** Whether to apply a muted text color */
    muted?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** The content of the heading */
    children?: import("svelte").Snippet;
  }

  let {
    level = "1",
    size = "xl",
    muted = false,
    class: className,
    children,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={`h${level}`}
  class={cn(
    "font-sans font-semibold text-balance",
    {
      "text-content-muted": muted,
      "text-content": !muted,

      // Hero / Display
      "text-4xl desk:text-5xl tracking-tighter": size === "3xl",
      "text-3xl desk:text-4xl tracking-tighter": size === "2xl",

      // Page / Section Titles
      "text-2xl desk:text-3xl tracking-tight": size === "xl",
      "text-xl desk:text-2xl tracking-tight": size === "lg",
      "text-lg desk:text-xl tracking-tight": size === "md",

      // Subtitles / Labels
      "text-base desk:text-lg tracking-normal": size === "sm",
      "text-sm desk:text-base tracking-normal": size === "xs",
    },
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
