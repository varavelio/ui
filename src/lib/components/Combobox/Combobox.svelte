<script lang="ts">
  import { Check, ChevronDown } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Combobox as BitsCombobox } from "bits-ui";
  import type { Component } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

  /**
   * Represents an individual option in the combobox list.
   */
  type ComboboxItem = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  };

  interface Props {
    /**
     * Icon component rendered before the input value.
     */
    icon?: Component;

    /**
     * Icon component rendered instead of the default chevron.
     */
    iconRight?: Component;

    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;

    /**
     * Optional ID for the combobox input element.
     */
    id?: string;

    /**
     * Label text for the combobox field.
     */
    label?: string;

    /**
     * Secondary helper text rendered below the label.
     */
    description?: string;

    /**
     * Placeholder text shown when the input is empty.
     * @default "Search..."
     */
    placeholder?: string;

    /**
     * Array of options to render in the dropdown list.
     */
    items: ComboboxItem[];

    /**
     * The bound value of the currently selected option.
     */
    value?: string;

    /**
     * If true, prevents user interaction and dims the control.
     * @default false
     */
    disabled?: boolean;

    /**
     * If true, marks the combobox as a required field in a form.
     * @default false
     */
    required?: boolean;

    /**
     * HTML input name attribute for form submission.
     */
    name?: string;

    /**
     * If true, allows clicking the selected option again to clear the selection.
     * @default false
     */
    allowDeselect?: boolean;

    /**
     * If true, allows users to commit values that are not present in the dataset.
     * Unmatched input is committed on close and a dedicated custom value option is shown in the menu.
     * @default false
     */
    allowCustomValue?: boolean;

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
     * Marks the combobox as error and styles it accordingly.
     * @default false
     */
    error?: boolean;

    /**
     * Message shown when the current query does not match any option.
     * @default "No results found."
     */
    emptyMessage?: string;
  }

  let {
    class: className,
    icon: Icon,
    iconRight: IconRight,
    id,
    label,
    description,
    placeholder = "Search...",
    items,
    value = $bindable(),
    disabled = false,
    required = false,
    name,
    allowDeselect = false,
    allowCustomValue = false,
    size = "md",
    radius = "md",
    variant = "default",
    error = false,
    emptyMessage = "No results found.",
  }: Props = $props();

  const uid = $props.id();
  let resolvedId = $derived(id ?? `${uid}-combobox`);
  let descriptionId = $derived(
    description ? `${resolvedId}-description` : undefined,
  );
  let invalidMessageId = $derived(`${resolvedId}-invalid-selection-message`);
  let describedBy = $derived.by(() => {
    const ids = [
      descriptionId,
      invalidInput ? invalidMessageId : undefined,
    ].filter(Boolean);

    return ids.length > 0 ? ids.join(" ") : undefined;
  });

  let open = $state(false);
  let draftValue = $state("");
  let invalidInput = $state(false);
  let hasDraftValue = $state(false);
  let selectedFromMenu = $state(false);

  let selectedItem = $derived(items.find((item) => item.value === value));
  let isCustomSelection = $derived(
    allowCustomValue && !!value && !selectedItem,
  );
  let hasError = $derived(error || invalidInput);
  let filteredItems = $derived.by(() => {
    const query = normalizeValue(draftValue);

    if (query === "") {
      return items;
    }

    return items.filter(
      (item) =>
        normalizeValue(item.label).includes(query) ||
        normalizeValue(item.value).includes(query),
    );
  });
  let showCreateOption = $derived.by(() => {
    const query = draftValue.trim();

    if (!allowCustomValue || query === "") {
      return false;
    }

    return !findExactItem(query);
  });
  let inputValue = $derived.by(() => {
    if (hasDraftValue) {
      return draftValue;
    }

    if (selectedItem) {
      return selectedItem.label;
    }

    if (isCustomSelection) {
      return value ?? "";
    }

    return "";
  });

  function normalizeValue(input: string) {
    return input.trim().toLowerCase();
  }

  function findExactItem(query: string) {
    const normalizedQuery = normalizeValue(query);

    if (normalizedQuery === "") {
      return undefined;
    }

    return items.find(
      (item) =>
        normalizeValue(item.label) === normalizedQuery ||
        normalizeValue(item.value) === normalizedQuery,
    );
  }

  function setCommittedValue(nextValue: string | undefined) {
    value = nextValue;
    invalidInput = false;
    hasDraftValue = false;

    if (!nextValue) {
      draftValue = "";
      return;
    }

    const matchingItem = items.find((item) => item.value === nextValue);
    draftValue = matchingItem?.label ?? nextValue;
  }

  function commitDraftValue() {
    const query = draftValue.trim();

    if (query === "") {
      setCommittedValue(undefined);
      return;
    }

    const exactItem = findExactItem(query);

    if (exactItem) {
      setCommittedValue(exactItem.value);
      return;
    }

    if (allowCustomValue) {
      setCommittedValue(query);
      return;
    }

    value = undefined;
    invalidInput = true;
    hasDraftValue = true;
    draftValue = query;
  }

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    draftValue = event.currentTarget.value;
    hasDraftValue = true;
    invalidInput = false;
    selectedFromMenu = false;
    value = undefined;

    if (!open) {
      open = true;
    }
  }

  function handleFocus() {
    hasDraftValue = true;

    if (!invalidInput) {
      draftValue =
        selectedItem?.label ?? (isCustomSelection ? (value ?? "") : "");
    }

    open = true;
  }

  function handleValueChange(nextValue: string) {
    selectedFromMenu = true;
    setCommittedValue(nextValue);
  }

  function handleTriggerMouseDown(event: MouseEvent) {
    event.preventDefault();
  }

  function handleOpenChangeComplete(nextOpen: boolean) {
    if (nextOpen) {
      return;
    }

    if (selectedFromMenu) {
      selectedFromMenu = false;
      return;
    }

    commitDraftValue();
  }
</script>

<div class={cn("space-y-2", className)}>
  {#if label || description}
    <div class="space-y-1">
      {#if label}
        <Label for={resolvedId}>{label}</Label>
      {/if}

      {#if description}
        <p id={descriptionId} class="text-sm text-content-muted">
          {description}
        </p>
      {/if}
    </div>
  {/if}

  {#if invalidInput}
    <p id={invalidMessageId} class="sr-only">
      Choose an existing option or enable custom values.
    </p>
  {/if}

  <BitsCombobox.Root
    {disabled}
    {required}
    {name}
    {allowDeselect}
    onValueChange={handleValueChange}
    bind:open
    bind:value
    {items}
    {inputValue}
    onOpenChangeComplete={handleOpenChangeComplete}
    type="single"
  >
    <div class="relative">
      {#if Icon}
        <div
          class={cn(
            "pointer-events-none absolute inset-y-0 left-0 flex items-center text-content-muted z-10",
            {
              "pl-3": size === "sm" || size === "md",
              "pl-4": size === "lg",
            }
          )}
        >
          <Icon
            class={cn({
              "size-3.5": size === "sm",
              "size-4": size === "md",
              "size-5": size === "lg",
            })}
          />
        </div>
      {/if}
      <BitsCombobox.Input
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        aria-label={label ?? placeholder}
        clearOnDeselect={allowDeselect}
        class={cn(
          "text-content inline-flex w-full border transition-colors duration-200",
          "hover:bg-base-100 hover:border-content",
          "focus-visible:bg-base-100 focus-visible:border-content",
          "focus:outline-none focus-visible:outline-none",
          "focus-visible:ring-1 focus-visible:ring-content",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-base-400",
          {
            "h-8 px-3 pr-10 text-xs": size === "sm",
            "h-10 px-3 pr-10 text-sm": size === "md",
            "h-12 px-4 pr-10 text-base": size === "lg",
            "rounded-none": radius === "none",
            "rounded-sm": radius === "sm",
            "rounded-md": radius === "md",
            "rounded-lg": radius === "lg",
            "rounded-full": radius === "full",
            "bg-base-100 border-base-400": variant === "default",
            "bg-transparent border-transparent": variant === "ghost",
            "bg-base-100 border-content ring-1 ring-content": open && !hasError,
            "border-error placeholder:text-error/50": hasError,
            "hover:border-error text-error": hasError,
            "focus-visible:border-error focus-visible:ring-error": hasError,
            "ring-1 ring-error bg-base-100": open && hasError,
            "pl-8": Icon && size === "sm",
            "pl-10": Icon && size === "md",
            "pl-11": Icon && size === "lg",
          },
        )}
        defaultValue={selectedItem?.label}
        id={resolvedId}
        onfocus={handleFocus}
        oninput={handleInput}
        {placeholder}
      />

      <BitsCombobox.Trigger
        aria-label={label ? `Toggle ${label}` : "Toggle options"}
        class={cn(
          "text-content-muted group absolute top-1/2 right-3 inline-flex -translate-y-1/2 items-center justify-center rounded-sm outline-none",
          "focus-visible:ring-1 focus-visible:ring-content disabled:cursor-not-allowed",
          {
            "size-3.5": size === "sm",
            "size-4": size === "md",
            "size-5": size === "lg",
          },
        )}
        onmousedown={handleTriggerMouseDown}
        tabindex={-1}
      >
        {#if IconRight}
          <IconRight
            class="size-full shrink-0 transition-transform group-data-[state=open]:rotate-180"
          />
        {:else}
          <ChevronDown
            aria-hidden="true"
            class="size-full shrink-0 transition-transform group-data-[state=open]:rotate-180"
          />
        {/if}
      </BitsCombobox.Trigger>
    </div>

    <BitsCombobox.Portal>
      <BitsCombobox.Content
        class="border-base-400 bg-base-100 z-50 max-h-72 w-(--bits-combobox-anchor-width) min-w-(--bits-combobox-anchor-width) overflow-auto rounded-lg border p-1 shadow-lg"
        sideOffset={4}
      >
        {#each filteredItems as item (item.value)}
          <BitsCombobox.Item
            disabled={item.disabled}
            label={item.label}
            value={item.value}
            class="data-highlighted:bg-base-200 data-[selected=true]:bg-base-200 flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-sm text-content outline-none transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-50"
          >
            {#snippet children({ selected })}
              <div class="min-w-0 flex-1">
                <div class="truncate font-medium">{item.label}</div>

                {#if item.description}
                  <div class="truncate text-xs text-content-muted">
                    {item.description}
                  </div>
                {/if}
              </div>

              <div class="flex size-4 shrink-0 items-center justify-center">
                {#if selected}
                  <Check aria-hidden="true" class="size-4" />
                {/if}
              </div>
            {/snippet}
          </BitsCombobox.Item>
        {/each}

        {#if showCreateOption}
          {#if filteredItems.length > 0}
            <div class="my-1 border-t border-base-400"></div>
          {/if}

          <BitsCombobox.Item
            label={draftValue.trim()}
            value={draftValue.trim()}
            class="data-highlighted:bg-base-200 data-[selected=true]:bg-base-200 flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-sm text-content outline-none transition-colors"
          >
            {#snippet children({ selected })}
              <div class="min-w-0 flex-1">
                <div class="truncate font-medium">
                  Use &quot;{draftValue.trim()}
                  &quot;
                </div>
                <div class="truncate text-xs text-content-muted">
                  Custom value
                </div>
              </div>

              <div class="flex size-4 shrink-0 items-center justify-center">
                {#if selected}
                  <Check aria-hidden="true" class="size-4" />
                {/if}
              </div>
            {/snippet}
          </BitsCombobox.Item>
        {:else if filteredItems.length === 0}
          <div class="px-3 py-2 text-sm text-content-muted">{emptyMessage}</div>
        {/if}
      </BitsCombobox.Content>
    </BitsCombobox.Portal>
  </BitsCombobox.Root>
</div>
