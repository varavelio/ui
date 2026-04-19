<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";
  import { AppLayoutState, setAppLayoutState } from "./state.svelte.js";

  interface Props {
    class?: ClassValue;
    children: Snippet;
  }

  let { class: className, children }: Props = $props();

  setAppLayoutState(new AppLayoutState());
</script>

<div class={cn("w-dvw h-dvh overflow-hidden", className)}>
  {@render children()}
</div>
