<script lang="ts">
  import { appLayoutApi } from "./api.ts";
  import type { AppLayoutState } from "./state.svelte.ts";

  const {
    state,
  }: {
    state: AppLayoutState;
  } = $props();

  $effect(() => {
    return appLayoutApi.onRouteChange(() => {
      state.closeSidebar();
    });
  });
</script>
