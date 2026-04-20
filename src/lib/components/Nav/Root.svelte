<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  export interface Props {
    class?: ClassValue;
    children: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<nav class={cn("flex flex-col space-y-1", className)}>{@render children()}</nav>
