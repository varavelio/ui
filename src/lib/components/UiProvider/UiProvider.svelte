<script lang="ts">
  import { Tooltip } from "bits-ui";

  import type { Snippet } from "svelte";

  interface Props {
    /**
     * If true, tooltips are disabled globally.
     * @default false
     */
    tooltipDisabled?: boolean;
    /**
     * Global hover delay before tooltips open.
     * @default 250
     */
    tooltipDelayDuration?: number;
    /**
     * Time to skip the open delay when another tooltip is already open.
     * @default 150
     */
    tooltipSkipDelayDuration?: number;
    /**
     * The application content wrapped by the provider.
     */
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
