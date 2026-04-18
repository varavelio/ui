<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Slider as BitsSlider } from "bits-ui";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

  interface BaseProps {
    /**
     * Additional CSS classes to apply to the slider wrapper.
     */
    class?: ClassValue;

    /**
     * Label text for the slider field.
     */
    label?: string;

    /**
     * Secondary helper text rendered below the label.
     */
    description?: string;

    /**
     * Control size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Minimum slider value.
     * @default 0
     */
    min?: number;

    /**
     * Maximum slider value.
     * @default 100
     */
    max?: number;

    /**
     * Step size or discrete values available on the slider.
     * @default 1
     */
    step?: number | number[];

    /**
     * If true, disables the slider.
     * @default false
     */
    disabled?: boolean;

    /**
     * Slider orientation.
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";

    /**
     * If true, shows a summary of the current value next to the label.
     * @default true
     */
    showValue?: boolean;

    /**
     * Formats visible values in the summary.
     */
    formatValue?: (value: number, index: number) => string;

    /**
     * The locale used for formatting values.
     * @default "en"
     */
    locale?: string;
  }

  interface SingleProps extends BaseProps {
    /**
     * Slider mode.
     * @default "single"
     */
    type?: "single";

    /**
     * The selected slider value.
     */
    value?: number;
  }

  interface MultipleProps extends BaseProps {
    /**
     * Slider mode.
     */
    type: "multiple";

    /**
     * The selected slider values.
     */
    value?: number[];
  }

  type Props = SingleProps | MultipleProps;

  let {
    class: className,
    label,
    description,
    type = "single",
    value = $bindable(),
    size = "md",
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    orientation = "horizontal",
    showValue = true,
    formatValue,
    locale = "en",
  }: Props = $props();

  let resolvedMin = $derived(Array.isArray(step) ? Math.min(...step) : min);
  let resolvedMax = $derived(Array.isArray(step) ? Math.max(...step) : max);

  function formatResolvedValue(nextValue: number, index: number) {
    if (formatValue) {
      return formatValue(nextValue, index);
    }

    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
    }).format(nextValue);
  }

  let displayValue = $derived.by(() => {
    const values = Array.isArray(value)
      ? value
      : [typeof value === "number" ? value : resolvedMin];

    return values
      .map((item, index) => formatResolvedValue(item, index))
      .join(" - ");
  });
</script>

<div
  class={cn(
    "space-y-3",
    {
      "inline-flex flex-col items-center": orientation === "vertical",
    },
    className,
  )}
>
  {#if label || description || showValue}
    <div class="flex w-full items-start justify-between gap-4">
      <div class="space-y-1">
        {#if label}
          <Label>{label}</Label>
        {/if}

        {#if description}
          <p class="text-sm text-content-muted">{description}</p>
        {/if}
      </div>

      {#if showValue}
        <p class="font-mono text-sm font-medium text-content-muted">
          {displayValue}
        </p>
      {/if}
    </div>
  {/if}

  <div
    class={cn({
      "w-full": orientation === "horizontal",
      "flex h-56 justify-center": orientation === "vertical",
    })}
  >
    <BitsSlider.Root
      bind:value={value as never}
      {disabled}
      max={resolvedMax}
      min={resolvedMin}
      {orientation}
      {step}
      thumbPositioning="exact"
      {type}
      class={cn(
        "relative flex touch-none select-none items-center",
        {
          "w-full": orientation === "horizontal",
          "h-full flex-col": orientation === "vertical",
        },
      )}
    >
      {#snippet children({ thumbItems })}
        <span
          class={cn(
            "bg-base-300 relative grow overflow-hidden rounded-full",
            {
              "h-1.5 w-full": orientation === "horizontal" && size === "sm",
              "h-2 w-full": orientation === "horizontal" && size === "md",
              "h-2.5 w-full": orientation === "horizontal" && size === "lg",
              "h-full w-1.5": orientation === "vertical" && size === "sm",
              "h-full w-2": orientation === "vertical" && size === "md",
              "h-full w-2.5": orientation === "vertical" && size === "lg",
            },
          )}
        >
          <BitsSlider.Range
            class={cn("bg-content absolute", {
              "h-full": orientation === "horizontal",
              "w-full": orientation === "vertical",
            })}
          />
        </span>

        {#each thumbItems as thumb (thumb.index)}
          <BitsSlider.Thumb
            index={thumb.index}
            class={cn(
              "border-base-400 bg-base-100 block rounded-full border-2 shadow-sm transition-colors duration-150",
              "hover:border-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content data-active:border-content",
              "disabled:pointer-events-none disabled:opacity-50",
              {
                "size-4": size === "sm",
                "size-5": size === "md",
                "size-6": size === "lg",
              },
            )}
          />
        {/each}
      {/snippet}
    </BitsSlider.Root>
  </div>
</div>
