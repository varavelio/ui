<script lang="ts">
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: ClassValue;
  }

  let { class: className, ...restProps }: Props = $props();
</script>

<div
  aria-hidden="true"
  class={cn("animate-pulse rounded-md bg-base-400", className)}
  {...restProps}
></div>
