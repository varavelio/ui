<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["tbody"], "children" | "class"> & {
    /** Additional CSS classes for the body section. */
    class?: ClassValue;
    /** Body rows. */
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<tbody {...restProps} class={cn(className)}>
  {@render children?.()}
</tbody>
