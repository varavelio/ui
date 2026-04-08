<script lang="ts">
  import { Tooltip } from "bits-ui";

  import type { Snippet } from "svelte";

  interface Props {
    tooltipDisabled?: boolean;
    tooltipDelayDuration?: number;
    tooltipSkipDelayDuration?: number;
    children: Snippet;
  }

  let {
    tooltipDisabled = false,
    tooltipDelayDuration = 250,
    tooltipSkipDelayDuration = 150,
    children,
  }: Props = $props();
</script>

<Tooltip.Provider
  disabled={tooltipDisabled}
  delayDuration={tooltipDelayDuration}
  skipDelayDuration={tooltipSkipDelayDuration}
>
  {@render children()}
</Tooltip.Provider>
