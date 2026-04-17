<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["caption"], "children" | "class"> & {
    /** Additional CSS classes for the caption. */
    class?: ClassValue;
    /** Caption content describing the table for semantics and assistive technology. */
    children?: Snippet;
    /** Whether the caption should be shown visually instead of remaining screen-reader only. */
    visible?: boolean;
  };

  let {
    class: className,
    children,
    visible = false,
    ...restProps
  }: Props = $props();
</script>

<caption
  {...restProps}
  class={cn(
    "caption-top",
    {
      "sr-only": !visible,
      "px-4 pt-3 pb-2 text-left text-xs leading-5 text-content-muted": visible,
    },
    className,
  )}
>
  {@render children?.()}
</caption>
