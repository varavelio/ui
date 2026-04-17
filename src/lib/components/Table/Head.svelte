<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["th"], "children" | "class"> & {
    /** Additional CSS classes for the header cell. */
    class?: ClassValue;
    /** Header cell content. */
    children?: Snippet;
    /** Horizontal alignment for the cell content. */
    align?: "left" | "center" | "right";
    /** Whether the column represents numeric data. */
    numeric?: boolean;
  };

  let {
    class: className,
    children,
    align,
    numeric = false,
    scope = "col",
    ...restProps
  }: Props = $props();

  const resolvedAlign = $derived(align ?? (numeric ? "right" : "left"));
</script>

<th
  {...restProps}
  {scope}
  class={cn(
    "border-b border-base-400 font-medium text-content-muted",
    {
      "text-left": resolvedAlign === "left",
      "text-center": resolvedAlign === "center",
      "text-right": resolvedAlign === "right",
      "font-mono tabular-nums": numeric,
    },
    className,
  )}
>
  {@render children?.()}
</th>
