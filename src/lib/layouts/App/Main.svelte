<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";

  /** Props for the Main component. */
  interface Props {
    /** Additional CSS classes for the main content area. */
    class?: ClassValue;
    /** The main content to display. */
    children: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<main
  class={cn("flex-1 min-w-0 min-h-0 overflow-x-hidden overflow-y-auto", className)}
>
  {@render children()}
</main>
