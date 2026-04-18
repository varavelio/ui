<script lang="ts">
  import type { CalendarDate } from "@internationalized/date";
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { DatePicker as BitsDatePicker } from "bits-ui";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Button from "../Button/Button.svelte";

  interface Props {
    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;

    /**
     * Optional ID for the date field input container.
     */
    id?: string;

    /**
     * Label text for the date picker field.
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
     * The selected date value.
     */
    value?: CalendarDate;

    /**
     * The placeholder date used to seed the field and calendar when empty.
     */
    placeholderValue?: CalendarDate;

    /**
     * The minimum selectable date.
     */
    minValue?: CalendarDate;

    /**
     * The maximum selectable date.
     */
    maxValue?: CalendarDate;

    /**
     * Controls the open state of the calendar popover.
     * @default false
     */
    open?: boolean;

    /**
     * If true, prevents user interaction and dims the field.
     * @default false
     */
    disabled?: boolean;

    /**
     * If true, prevents editing the field and selecting dates.
     * @default false
     */
    readonly?: boolean;

    /**
     * If true, marks the date picker as a required field in a form.
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
     * Locale used to format dates and weekdays.
     * @default "en-GB"
     */
    locale?: string;

    /**
     * Whether the popover should close immediately after selecting a date.
     * @default true
     */
    closeOnDateSelect?: boolean;

    /**
     * Prevents clearing the current date without choosing another one.
     * @default false
     */
    preventDeselect?: boolean;

    /**
     * Segments that should remain read-only.
     */
    readonlySegments?: ("day" | "month" | "year")[];

    /**
     * First day of the week, where 0 is Sunday and 6 is Saturday.
     */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    /**
     * Format used for weekday labels in the calendar.
     * @default "short"
     */
    weekdayFormat?: "narrow" | "short" | "long";

    /**
     * Format used for the month heading.
     * @default "long"
     */
    monthFormat?:
      | "short"
      | "long"
      | "narrow"
      | "numeric"
      | "2-digit"
      | ((month: number) => string);

    /**
     * Format used for the year heading.
     * @default "numeric"
     */
    yearFormat?: "numeric" | "2-digit" | ((year: number) => string);

    /**
     * Number of months displayed in the calendar popover.
     * @default 1
     */
    numberOfMonths?: number;

    /**
     * If true, month navigation advances by all visible months at once.
     * @default false
     */
    pagedNavigation?: boolean;

    /**
     * If true, the calendar always renders six weeks.
     * @default false
     */
    fixedWeeks?: boolean;

    /**
     * If true, the calendar focuses an appropriate day when opened.
     * @default false
     */
    initialFocus?: boolean;

    /**
     * Accessible label announced when the calendar opens.
     */
    calendarLabel?: string;

    /**
     * Returns true for unavailable dates that should remain selectable but invalid.
     */
    isDateUnavailable?: (date: CalendarDate) => boolean;

    /**
     * Returns true for disabled dates that should not be selectable.
     */
    isDateDisabled?: (date: CalendarDate) => boolean;

    /**
     * Returns a validation message or messages when the selected date is invalid.
     */
    validate?: (date: CalendarDate) => string | string[] | undefined;

    /**
     * Callback fired when the current date becomes invalid.
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
    open = $bindable(false),
    disabled = false,
    readonly = false,
    required = false,
    error = false,
    size = "md",
    radius = "md",
    variant = "default",
    locale = "en-GB",
    closeOnDateSelect = true,
    preventDeselect = false,
    readonlySegments,
    weekStartsOn,
    weekdayFormat = "short",
    monthFormat = "long",
    yearFormat = "numeric",
    numberOfMonths = 1,
    pagedNavigation = false,
    fixedWeeks = false,
    initialFocus = false,
    calendarLabel,
    isDateUnavailable,
    isDateDisabled,
    validate,
    onInvalid,
  }: Props = $props();

  const uid = $props.id();
  let resolvedId = $derived(id ?? `${uid}-date-picker`);
  let descriptionId = $derived(
    description ? `${resolvedId}-description` : undefined,
  );
  let resolvedCalendarLabel = $derived(calendarLabel ?? label ?? "Choose date");
  let currentDate = $derived(today(getLocalTimeZone()));

  function createInitialPlaceholder() {
    return placeholderValue ?? value ?? today(getLocalTimeZone());
  }

  let placeholder = $state<CalendarDate>(createInitialPlaceholder());

  function isSelectableDate(date: CalendarDate) {
    if (minValue && date.compare(minValue) < 0) {
      return false;
    }

    if (maxValue && date.compare(maxValue) > 0) {
      return false;
    }

    if (isDateDisabled?.(date) || isDateUnavailable?.(date)) {
      return false;
    }

    return true;
  }

  function handleToday() {
    if (!isSelectableDate(currentDate)) {
      return;
    }

    value = currentDate;
    placeholder = currentDate;

    if (closeOnDateSelect) {
      open = false;
    }
  }

  function handleClear() {
    value = undefined;
    open = false;
  }
</script>

<div class={cn("space-y-2", className)}>
  <BitsDatePicker.Root
    bind:open
    bind:placeholder={placeholder as never}
    bind:value={value as never}
    calendarLabel={resolvedCalendarLabel}
    {closeOnDateSelect}
    {disabled}
    {fixedWeeks}
    {initialFocus}
    isDateDisabled={isDateDisabled as never}
    isDateUnavailable={isDateUnavailable as never}
    {locale}
    {maxValue}
    {minValue}
    monthFormat={monthFormat as never}
    {numberOfMonths}
    onInvalid={onInvalid as never}
    {pagedNavigation}
    {preventDeselect}
    {readonly}
    {readonlySegments}
    {required}
    validate={validate as never}
    {weekStartsOn}
    {weekdayFormat}
    yearFormat={yearFormat as never}
  >
    {#if label || description}
      <div class="space-y-1">
        {#if label}
          <BitsDatePicker.Label
            class="inline-flex cursor-pointer items-center gap-1 select-none text-sm font-medium text-content data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:text-error"
          >
            {label}
            {#if required}
              <span aria-hidden="true" class="text-error">*</span>
            {/if}
          </BitsDatePicker.Label>
        {/if}

        {#if description}
          <p id={descriptionId} class="text-sm text-content-muted">
            {description}
          </p>
        {/if}
      </div>
    {/if}

    <BitsDatePicker.Input
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
              <BitsDatePicker.Segment {part} class="px-0.5 text-content-muted">
                {value}
              </BitsDatePicker.Segment>
            {:else}
              <BitsDatePicker.Segment
                {part}
                class="rounded-sm px-0.5 py-1 outline-none transition-colors aria-[valuetext=Empty]:text-content-muted hover:bg-base-300 focus:bg-base-300 data-invalid:text-error"
              >
                {value}
              </BitsDatePicker.Segment>
            {/if}
          {/each}
        </div>

        <BitsDatePicker.Trigger
          aria-label={label ? `Open ${label} calendar` : "Open calendar"}
          class={cn(
            "ml-auto inline-flex shrink-0 items-center justify-center rounded-sm text-content-muted transition-colors hover:bg-base-300 hover:text-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content",
            {
              "size-6": size === "sm",
              "size-7": size === "md",
              "size-8": size === "lg",
            },
          )}
        >
          <CalendarDays aria-hidden="true" class="size-4" />
        </BitsDatePicker.Trigger>
      {/snippet}
    </BitsDatePicker.Input>

    <BitsDatePicker.Portal>
      <BitsDatePicker.Content align="start" class="z-50" sideOffset={4}>
        <div
          class="border-base-400 bg-base-100 w-auto rounded-lg border p-3 shadow-lg"
        >
          <BitsDatePicker.Calendar class="space-y-4">
            {#snippet children({ months, weekdays })}
              <BitsDatePicker.Header
                class="flex items-center justify-between gap-3"
              >
                <BitsDatePicker.PrevButton
                  class="inline-flex size-8 items-center justify-center rounded-sm text-content-muted transition-colors hover:bg-base-300 hover:text-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content"
                >
                  <ChevronLeft aria-hidden="true" class="size-4" />
                </BitsDatePicker.PrevButton>

                <BitsDatePicker.Heading
                  class="min-w-0 flex-1 text-center text-sm font-medium text-content"
                />

                <BitsDatePicker.NextButton
                  class="inline-flex size-8 items-center justify-center rounded-sm text-content-muted transition-colors hover:bg-base-300 hover:text-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content"
                >
                  <ChevronRight aria-hidden="true" class="size-4" />
                </BitsDatePicker.NextButton>
              </BitsDatePicker.Header>

              <div
                class={cn("flex flex-col gap-4", {
                  "desk:flex-row": numberOfMonths > 1,
                })}
              >
                {#each months as month (month.value)}
                  <BitsDatePicker.Grid
                    class="w-full border-collapse select-none space-y-1"
                  >
                    <BitsDatePicker.GridHead>
                      <BitsDatePicker.GridRow class="mb-1 flex w-full gap-1">
                        {#each weekdays as weekday (weekday)}
                          <BitsDatePicker.HeadCell
                            class="flex-1 text-center text-[11px] font-medium uppercase tracking-wide text-content-muted"
                          >
                            {weekday}
                          </BitsDatePicker.HeadCell>
                        {/each}
                      </BitsDatePicker.GridRow>
                    </BitsDatePicker.GridHead>

                    <BitsDatePicker.GridBody>
                      {#each month.weeks as weekDates (weekDates)}
                        <BitsDatePicker.GridRow class="flex w-full gap-1">
                          {#each weekDates as date (date)}
                            <BitsDatePicker.Cell
                              {date}
                              class="relative flex-1"
                              month={month.value}
                            >
                              <BitsDatePicker.Day
                                class="data-selected:bg-content data-selected:text-base-100 data-disabled:pointer-events-none data-disabled:text-content-muted/40 data-outside-month:text-content-muted/50 data-outside-month:opacity-70 data-unavailable:line-through data-today:border-content hover:bg-base-300 focus-visible:bg-base-300 inline-flex size-9 items-center justify-center rounded-md border border-transparent text-sm font-medium transition-colors focus-visible:outline-none"
                              >
                                {date.day}
                              </BitsDatePicker.Day>
                            </BitsDatePicker.Cell>
                          {/each}
                        </BitsDatePicker.GridRow>
                      {/each}
                    </BitsDatePicker.GridBody>
                  </BitsDatePicker.Grid>
                {/each}
              </div>
            {/snippet}
          </BitsDatePicker.Calendar>

          {#if !disabled && !readonly}
            <div
              class="mt-3 flex items-center justify-between gap-3 border-t border-base-400 pt-3"
            >
              <Button
                color="neutral"
                disabled={!isSelectableDate(currentDate)}
                onclick={handleToday}
                size="sm"
                variant="ghost"
              >
                Today
              </Button>

              {#if value}
                <Button
                  color="neutral"
                  onclick={handleClear}
                  size="sm"
                  variant="ghost"
                >
                  Clear
                </Button>
              {/if}
            </div>
          {/if}
        </div>
      </BitsDatePicker.Content>
    </BitsDatePicker.Portal>
  </BitsDatePicker.Root>
</div>
