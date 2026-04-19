<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";

  interface Props {
    class?: ClassValue;
    children: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<main class={cn("p-4 overflow-auto grow", className)}>
  {@render children()}
</main>
