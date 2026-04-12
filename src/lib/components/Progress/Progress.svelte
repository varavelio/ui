<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Progress as BitsProgress } from "bits-ui";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type DivProps = SvelteHTMLElements["div"];

  interface Props extends DivProps {
    /**
     * The current progress value. Set to null for an indeterminate state.
     * @default 0
     */
    value?: number | null;
    /**
     * The maximum progress value.
     * @default 100
     */
    max?: number;
    /**
     * An optional label for the progress bar.
     */
    label?: string;
    /**
     * The visual thickness of the progress bar.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * The semantic color of the progress bar.
     * @default "info"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";
    /**
     * Whether to display the percentage text next to the label.
     * @default false
     */
    showValue?: boolean;
  }

  let {
    class: className,
    value = 0,
    max = 100,
    label,
    size = "md",
    color = "info",
    showValue = false,
    ...restProps
  }: Props = $props();

  const labelId = $props.id();

  let clampedValue = $derived(
    value === null ? null : Math.min(Math.max(value, 0), max),
  );
  let percentage = $derived(
    clampedValue === null || max <= 0
      ? 0
      : Math.round((clampedValue / max) * 100),
  );
</script>

<div {...restProps} class={cn("space-y-2", className)}>
  {#if label || showValue}
    <div class="flex items-center justify-between gap-3 text-sm">
      {#if label}
        <span class="font-medium text-content" id={`${labelId}-label`}>
          {label}
        </span>
      {/if}
      {#if showValue}
        <span class="text-content-muted">
          {clampedValue === null ? "..." : `${percentage}%`}
        </span>
      {/if}
    </div>
  {/if}

  <BitsProgress.Root
    aria-label={!label ? "Progress" : undefined}
    aria-labelledby={label ? `${labelId}-label` : undefined}
    class={cn("bg-base-300 overflow-hidden rounded-full", {
      "h-1.5": size === "sm",
      "h-2": size === "md",
      "h-3": size === "lg",
    })}
    {max}
    min={0}
    value={clampedValue}
  >
    <div
      class={cn("h-full rounded-full transition-transform", {
        "bg-content": color === "neutral",
        "bg-info": color === "info",
        "bg-success": color === "success",
        "bg-warning": color === "warning",
        "bg-error": color === "error",
      })}
      style={clampedValue === null ? undefined : `transform: translateX(-${100 - percentage}%); width: 100%;`}
    ></div>
  </BitsProgress.Root>
</div>
