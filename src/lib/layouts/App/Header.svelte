<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";

  /** Props for the Header component. */
  interface Props {
    /** Additional CSS classes for the header container. */
    class?: ClassValue;
    /** Header content. */
    children: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<header
  class={cn(
    "flex h-14 shrink-0 items-center gap-4 border-b border-base-400 px-4",
    className,
  )}
>
  {@render children()}
</header>
