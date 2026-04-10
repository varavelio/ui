<script lang="ts">
  import { Tooltip } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props {
    /**
     * The application content wrapped by the provider.
     */
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<Tooltip.Provider>{@render children()}</Tooltip.Provider>
