<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLElement> {
    /** Typography scale preset for prose content. */
    size?: "sm" | "md" | "lg";
    /** Removes typography max-width constraint when true. */
    fluid?: boolean;
    /** Additional CSS classes to apply to the prose wrapper. */
    class?: string;
    /** Rich content rendered inside the prose wrapper. */
    children?: Snippet;
  }

  let {
    size = "md",
    fluid = false,
    class: className,
    children,
    ...restProps
  }: Props = $props();
</script>

<article
  class={cn(
    "prose text-content dark:prose-invert",
    "prose-headings:font-sans prose-headings:font-semibold prose-headings:text-balance prose-headings:text-content",
    "prose-p:text-content prose-li:text-content prose-strong:text-content prose-code:text-content",
    "prose-a:font-medium prose-a:text-current prose-a:underline prose-a:underline-offset-4 prose-a:decoration-base-400 prose-a:transition-colors prose-a:duration-150 prose-a:hover:decoration-content",
    "prose-pre:border prose-pre:border-base-400 prose-pre:bg-base-200 prose-pre:text-content",
    "prose-th:text-content prose-td:text-content",
    "prose-blockquote:text-content-muted prose-blockquote:border-base-400 prose-hr:border-base-400",
    "prose-h1:text-4xl desk:prose-h1:text-5xl prose-h1:tracking-tighter",
    "prose-h2:text-3xl desk:prose-h2:text-4xl prose-h2:tracking-tighter",
    "prose-h3:text-2xl desk:prose-h3:text-3xl prose-h3:tracking-tight",
    "prose-h4:text-xl desk:prose-h4:text-2xl prose-h4:tracking-tight",
    "prose-h5:text-lg desk:prose-h5:text-xl prose-h5:tracking-tight",
    "prose-h6:text-base desk:prose-h6:text-lg prose-h6:tracking-normal",
    {
      "prose-sm": size === "sm",
      "prose-base": size === "md",
      "prose-lg": size === "lg",
      "max-w-none": fluid,
    },
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</article>
