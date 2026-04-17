<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["td"], "children" | "class"> & {
    /** Additional CSS classes for the cell. */
    class?: ClassValue;
    /** Cell content. */
    children?: Snippet;
    /** Horizontal alignment for the cell content. */
    align?: "left" | "center" | "right";
    /** Whether the cell represents numeric data. */
    numeric?: boolean;
  };

  let {
    class: className,
    children,
    align,
    numeric = false,
    ...restProps
  }: Props = $props();

  const resolvedAlign = $derived(align ?? (numeric ? "right" : "left"));
</script>

<td
  {...restProps}
  class={cn(
    "border-b border-base-400 align-middle",
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
</td>
