<script lang="ts">
  import type { Snippet } from "svelte";
  import { AppLayoutState, setAppLayoutState } from "./state.svelte.js";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  setAppLayoutState(new AppLayoutState());
</script>

<div class="w-dvw h-dvh overflow-hidden">{@render children()}</div>
