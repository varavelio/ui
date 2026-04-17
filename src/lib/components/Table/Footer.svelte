<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["tfoot"], "children" | "class"> & {
    /** Additional CSS classes for the footer section. */
    class?: ClassValue;
    /** Footer rows. */
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<tfoot
  {...restProps}
  class={cn(
    "[&_tr]:bg-base-200 [&_tr:first-child_td]:border-t [&_tr:first-child_td]:border-base-400",
    className,
  )}
>
  {@render children?.()}
</tfoot>
