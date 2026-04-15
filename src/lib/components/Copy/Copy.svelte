<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used but not detected by biome.
  import { Check, Copy as CopyIcon } from "@lucide/svelte";
  import { onDestroy } from "svelte";
  import type { ClassValue, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import { clipboard } from "../../runtime/index.js";
  import { Button } from "../Button/index.js";
  import { Tooltip } from "../Tooltip/index.js";

  interface Props extends Omit<HTMLButtonAttributes, "children" | "class"> {
    /**
     * Plain text copied to the clipboard.
     */
    text: string;

    /**
     * Additional CSS classes to apply to the button.
     */
    class?: ClassValue;

    /**
     * Accessible label and default tooltip text.
     * @default "Copy to clipboard"
     */
    label?: string;

    /**
     * Tooltip and live-region text shown after success.
     * @default "Copied"
     */
    copiedLabel?: string;

    /**
     * How long the success state stays visible in milliseconds.
     * @default 1000
     */
    timeout?: number;

    /**
     * Button size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Preferred tooltip placement.
     * @default "top"
     */
    side?: "top" | "bottom" | "left" | "right";
  }

  let {
    text,
    class: className,
    label = "Copy to clipboard",
    copiedLabel = "Copied",
    timeout = 1000,
    size = "md",
    side = "top",
    disabled = false,
    ...restProps
  }: Props = $props();

  let copied = $state(false);
  let tooltipContent = $derived(copied ? copiedLabel : label);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => {
    if (resetTimer) {
      clearTimeout(resetTimer);
    }
  });

  async function handleCopy() {
    if (disabled || copied) {
      return;
    }

    const didCopy = await clipboard.copy(text, { quiet: true });

    copied = didCopy;

    if (!didCopy) {
      return;
    }

    if (resetTimer) {
      clearTimeout(resetTimer);
    }

    resetTimer = setTimeout(() => {
      copied = false;
    }, timeout);
  }
</script>

<Tooltip content={tooltipContent} delay={0} {side}>
  <Button
    {...restProps}
    square
    {size}
    variant="ghost"
    color={copied ? "success" : "neutral"}
    {disabled}
    aria-label={label}
    class={cn("shrink-0", className)}
    onclick={handleCopy}
  >
    {#if copied}
      <Check class="size-4" />
    {:else}
      <CopyIcon class="size-4" />
    {/if}

    <span aria-live="polite" class="sr-only">{copied ? copiedLabel : ""}</span>
  </Button>
</Tooltip>
