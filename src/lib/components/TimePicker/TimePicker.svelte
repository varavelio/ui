<script lang="ts">
  import { Time } from "@internationalized/date";
  import { Clock3 } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { TimeField as BitsTimeField } from "bits-ui";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;

    /**
     * Optional ID for the time field input container.
     */
    id?: string;

    /**
     * Label text for the time picker field.
     */
    label?: string;

    /**
     * Secondary helper text rendered below the label.
     */
    description?: string;

    /**
     * HTML input name attribute for form submission.
     */
    name?: string;

    /**
     * The selected time value.
     */
    value?: Time;

    /**
     * The placeholder time used to seed the field when empty.
     */
    placeholderValue?: Time;

    /**
     * The minimum selectable time.
     */
    minValue?: Time;

    /**
     * The maximum selectable time.
     */
    maxValue?: Time;

    /**
     * If true, prevents user interaction and dims the field.
     * @default false
     */
    disabled?: boolean;

    /**
     * If true, prevents editing the field.
     * @default false
     */
    readonly?: boolean;

    /**
     * If true, marks the time picker as a required field in a form.
     * @default false
     */
    required?: boolean;

    /**
     * Marks the field as error and styles it accordingly.
     * @default false
     */
    error?: boolean;

    /**
     * Control height and typography size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Corner radius preset.
     * @default "md"
     */
    radius?: "none" | "sm" | "md" | "lg" | "full";

    /**
     * Surface style variant.
     * @default "default"
     */
    variant?: "default" | "ghost";

    /**
     * Locale used to format time segments.
     * @default "en-GB"
     */
    locale?: string;

    /**
     * The granularity rendered in the time field.
     * @default "minute"
     */
    granularity?: "hour" | "minute" | "second";

    /**
     * The hour cycle used to format time.
     */
    hourCycle?: 12 | 24;

    /**
     * Segments that should remain read-only.
     */
    readonlySegments?: ("hour" | "minute" | "second" | "dayPeriod")[];

    /**
     * Returns a validation message or messages when the selected time is invalid.
     */
    validate?: (time: Time) => string | string[] | undefined;

    /**
     * Callback fired when the current time becomes invalid.
     */
    onInvalid?: (
      reason: "min" | "max" | "custom",
      message?: string | string[],
    ) => void;
  }

  let {
    class: className,
    id,
    label,
    description,
    name,
    value = $bindable(),
    placeholderValue,
    minValue,
    maxValue,
    disabled = false,
    readonly = false,
    required = false,
    error = false,
    size = "md",
    radius = "md",
    variant = "default",
    locale = "en-GB",
    granularity = "minute",
    hourCycle,
    readonlySegments,
    validate,
    onInvalid,
  }: Props = $props();

  const uid = $props.id();
  let resolvedId = $derived(id ?? `${uid}-time-picker`);
  let descriptionId = $derived(
    description ? `${resolvedId}-description` : undefined,
  );

  function createInitialPlaceholder() {
    return placeholderValue ?? value ?? new Time(12, 0);
  }

  let placeholder = $state<Time>(createInitialPlaceholder());
</script>

<div class={cn("space-y-2", className)}>
  <BitsTimeField.Root
    bind:placeholder={placeholder as never}
    bind:value={value as never}
    {disabled}
    errorMessageId={descriptionId}
    {granularity}
    {hourCycle}
    {locale}
    {maxValue}
    {minValue}
    onInvalid={onInvalid as never}
    {readonly}
    {readonlySegments}
    {required}
    validate={validate as never}
  >
    {#if label || description}
      <div class="space-y-1">
        {#if label}
          <BitsTimeField.Label
            class="inline-flex cursor-pointer items-center gap-1 select-none text-sm font-medium text-content data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:text-error"
          >
            {label}
            {#if required}
              <span aria-hidden="true" class="text-error">*</span>
            {/if}
          </BitsTimeField.Label>
        {/if}

        {#if description}
          <p id={descriptionId} class="text-sm text-content-muted">
            {description}
          </p>
        {/if}
      </div>
    {/if}

    <BitsTimeField.Input
      aria-describedby={descriptionId}
      class={cn(
        "text-content inline-flex w-full select-none items-center border transition-colors duration-200",
        "hover:bg-base-100 hover:border-content",
        "focus-within:bg-base-100 focus-within:border-content",
        "focus-within:outline-none focus-within:ring-1 focus-within:ring-content",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:border-base-400",
        "data-invalid:border-error data-invalid:focus-within:border-error data-invalid:focus-within:ring-error",
        {
          "min-h-8 px-2.5 text-xs": size === "sm",
          "min-h-10 px-3 text-sm": size === "md",
          "min-h-12 px-4 text-base": size === "lg",
          "rounded-none": radius === "none",
          "rounded-sm": radius === "sm",
          "rounded-md": radius === "md",
          "rounded-lg": radius === "lg",
          "rounded-full": radius === "full",
          "bg-base-100 border-base-400": variant === "default",
          "bg-transparent border-transparent": variant === "ghost",
          "border-error focus-within:border-error focus-within:ring-error": error,
        },
      )}
      {id}
      {name}
    >
      {#snippet children({ segments })}
        <div class="flex min-w-0 flex-1 flex-wrap items-center gap-0.5">
          {#each segments as { part, value }, index (part + index)}
            {#if part === "literal"}
              <BitsTimeField.Segment {part} class="px-0.5 text-content-muted">
                {value}
              </BitsTimeField.Segment>
            {:else}
              <BitsTimeField.Segment
                {part}
                class="rounded-sm px-0.5 py-1 outline-none transition-colors aria-[valuetext=Empty]:text-content-muted hover:bg-base-300 focus:bg-base-300 data-invalid:text-error"
              >
                {value}
              </BitsTimeField.Segment>
            {/if}
          {/each}
        </div>

        <Clock3
          aria-hidden="true"
          class="ml-auto size-4 shrink-0 text-content-muted"
        />
      {/snippet}
    </BitsTimeField.Input>
  </BitsTimeField.Root>
</div>
