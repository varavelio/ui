<script lang="ts">
  import { Check, ChevronDown } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Select as BitsSelect } from "bits-ui";
  import type { ClassValue } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

  /**
   * Represents an individual option in the select dropdown.
   */
  type SelectItem = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  };

  interface Props {
    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;

    /**
     * Corner radius preset.
     * @default "md"
     */
    radius?: "none" | "sm" | "md" | "lg" | "full";

    /**
     * Label text for the select field.
     */
    label?: string;

    /**
     * Secondary helper text rendered below the label.
     */
    description?: string;

    /**
     * Placeholder text shown when no option is selected.
     * @default "Select an option"
     */
    placeholder?: string;

    /**
     * Array of options to render in the dropdown menu.
     */
    items: SelectItem[];

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
     * If true, marks the select as a required field in a form.
     * @default false
     */
    required?: boolean;

    /**
     * HTML input name attribute for form submission.
     */
    name?: string;

    /**
     * If true, allows the user to click the active option again to deselect it.
     * @default false
     */
    allowDeselect?: boolean;

    /**
     * Control height and typography size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Surface style variant.
     * @default "default"
     */
    variant?: "default" | "ghost";

    /**
     * Marks the select as error and styles it accordingly.
     * @default false
     */
    error?: boolean;
  }

  let {
    class: className,
    label,
    description,
    placeholder = "Select an option",
    items,
    value = $bindable(),
    disabled = false,
    required = false,
    name,
    allowDeselect = false,
    radius = "md",
    size = "md",
    variant = "default",
    error = false,
  }: Props = $props();

  let open = $state(false);
  let selectedItem = $derived(items.find((item) => item.value === value));
</script>

<div class={cn("space-y-2", className)}>
  {#if label || description}
    <div class="space-y-1">
      {#if label}
        <Label>{label}</Label>
      {/if}
      {#if description}
        <p class="text-sm text-content-muted">{description}</p>
      {/if}
    </div>
  {/if}

  <BitsSelect.Root
    {disabled}
    {required}
    {name}
    {allowDeselect}
    bind:value
    bind:open
    {items}
    type="single"
  >
    <BitsSelect.Trigger
      aria-label={label ?? placeholder}
      aria-invalid={error || undefined}
      class={cn(
        // Base layout & typography
        "text-content inline-flex w-full items-center gap-3 border transition-colors duration-200",
        // Hover state
        "hover:bg-base-100 hover:border-content",
        // Focus & open states
        "focus-visible:bg-base-100 focus-visible:border-content data-[state=open]:bg-base-100 data-[state=open]:border-content",
        // Focus ring
        "focus:outline-none focus-visible:outline-none",
        "focus-visible:ring-1 focus-visible:ring-content data-[state=open]:ring-1 data-[state=open]:ring-content",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-base-400",
        
        // Dynamic classes
        {
          // Size presets
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-3 text-sm": size === "md",
          "h-12 px-4 text-base": size === "lg",
          // Radius presets
          "rounded-none": radius === "none",
          "rounded-sm": radius === "sm",
          "rounded-md": radius === "md",
          "rounded-lg": radius === "lg",
          "rounded-full": radius === "full",
          // Variant presets
          "bg-base-100 border-base-400": variant === "default",
          "bg-transparent border-transparent": variant === "ghost",
          // State variants
          "text-content-muted": !value,
          // Error state
          "border-error placeholder:text-error/50": error,
          "hover:border-error text-error": error,
          "focus-visible:border-error focus-visible:ring-error": error,
          "data-[state=open]:border-error data-[state=open]:ring-error": error,
        }
      )}
    >
      <span class="min-w-0 flex-1 truncate text-left">
        {selectedItem?.label ?? placeholder}
      </span>
      <ChevronDown
        aria-hidden="true"
        class="text-content-muted size-4 shrink-0 transition-transform"
      />
    </BitsSelect.Trigger>

    <BitsSelect.Portal>
      <BitsSelect.Content
        class="border-base-400 bg-base-100 z-50 max-h-72 min-w-(--bits-select-anchor-width) overflow-auto rounded-lg border p-1 shadow-lg"
        sideOffset={4}
      >
        {#each items as item (item.value)}
          <BitsSelect.Item
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
          </BitsSelect.Item>
        {/each}
      </BitsSelect.Content>
    </BitsSelect.Portal>
  </BitsSelect.Root>
</div>
