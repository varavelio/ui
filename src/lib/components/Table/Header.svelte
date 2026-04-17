<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["thead"], "children" | "class"> & {
    /** Additional CSS classes for the header section. */
    class?: ClassValue;
    /** Header rows. */
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<thead {...restProps} class={cn("[&_tr]:bg-base-200", className)}>
  {@render children?.()}
</thead>
