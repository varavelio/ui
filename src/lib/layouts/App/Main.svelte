<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";

  /** Props for the Main component. */
  interface Props {
    /** Additional CSS classes for the main content area. */
    class?: ClassValue;
    /** Surface background preset. */
    bg?: "100" | "200" | "300";
    /** The main content to display. */
    children: Snippet;
  }

  let { class: className, bg, children }: Props = $props();
</script>

<main
  class={cn(
    "flex-1 min-w-0 min-h-0 overflow-x-hidden overflow-y-auto",
    {
      "bg-base-100 text-content": bg === "100",
      "bg-base-200 text-content": bg === "200",
      "bg-base-300 text-content": bg === "300",
    },
    className,
  )}
>
  {@render children()}
</main>
