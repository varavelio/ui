<script lang="ts">
  import { Tooltip } from "bits-ui";
  import type { Snippet } from "svelte";
  import DialogProvider from "$lib/runtime/dialog/DialogProvider.svelte";
  import ToastProvider from "$lib/runtime/toast/ToastProvider.svelte";

  interface Props {
    /**
     * The application content wrapped by the provider.
     */
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<Tooltip.Provider>
  {@render children()}
  <DialogProvider />
  <ToastProvider />
</Tooltip.Provider>
