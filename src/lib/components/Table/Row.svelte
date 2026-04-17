<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["tr"], "children" | "class"> & {
    /** Additional CSS classes for the row. */
    class?: ClassValue;
    /** Row cells. */
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<tr {...restProps} class={cn(className)}>
  {@render children?.()}
</tr>
