<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "$lib/helpers/cn.js";
  import { AppLayoutState, setAppLayoutState } from "./state.svelte.js";

  /** Props for the Root component. */
  interface Props {
    /** Additional CSS classes to apply to the root layout container. */
    class?: ClassValue;
    /** The content to be rendered within the layout root. */
    children: Snippet;
  }

  let { class: className, children }: Props = $props();

  setAppLayoutState(new AppLayoutState());
</script>

<div class={cn("w-dvw h-dvh overflow-hidden", className)}>
  {@render children()}
</div>
