<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { RadioGroup as BitsRadioGroup } from "bits-ui";
  import type { ClassValue } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

  /**
   * Individual option within the radio group.
   */
  type RadioGroupItem = {
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
     * Optional ID for the radio group.
     */
    id?: string;

    /**
     * Group label text.
     */
    label?: string;

    /**
     * Group helper text.
     */
    description?: string;

    /**
     * Array of options to render in the group.
     */
    items: RadioGroupItem[];

    /**
     * The bound value of the currently selected item.
     */
    value?: string;

    /**
     * If true, prevents user interaction with the entire group.
     * @default false
     */
    disabled?: boolean;

    /**
     * If true, prevents user interaction but retains normal styling.
     * @default false
     */
    readonly?: boolean;

    /**
     * If true, marks the radio group as a required field.
     * @default false
     */
    required?: boolean;

    /**
     * HTML input name attribute for form submission.
     */
    name?: string;

    /**
     * Layout orientation of the items.
     * @default "vertical"
     */
    orientation?: "horizontal" | "vertical";

    /**
     * Visual size preset of the radio items.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Semantic color representation for the selected state.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";
  }

  let {
    class: className,
    id,
    label,
    description,
    items,
    value = $bindable(),
    disabled = false,
    readonly = false,
    required = false,
    name,
    orientation = "vertical",
    size = "md",
    color = "neutral",
  }: Props = $props();

  const uid = $props.id();
  let resolvedId = $derived(id ?? `${uid}-radio-group`);
</script>

<div class={cn("space-y-3", className)}>
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

  <BitsRadioGroup.Root
    {disabled}
    {readonly}
    {required}
    {name}
    {orientation}
    bind:value
    class={cn(
      orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3",
    )}
  >
    {#each items as item (item.value)}
      <div class="flex items-start gap-3">
        <BitsRadioGroup.Item
          disabled={item.disabled}
          id={`${resolvedId}-${item.value}`}
          value={item.value}
          class={cn(
            // Base layout
            "border-base-400 bg-base-100 inline-flex shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
            // Focus state
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50",
            {
              // Size presets
              "size-4": size === "sm",
              "size-5": size === "md",
              "size-6": size === "lg",

              // Color presets
              "data-[state=checked]:border-content text-content focus-visible:outline-content": color === "neutral",
              "data-[state=checked]:border-info text-info focus-visible:outline-info": color === "info",
              "data-[state=checked]:border-success text-success focus-visible:outline-success": color === "success",
              "data-[state=checked]:border-warning text-warning focus-visible:outline-warning": color === "warning",
              "data-[state=checked]:border-error text-error focus-visible:outline-error": color === "error",
            },
          )}
        >
          {#snippet children({ checked })}
            <span
              class={cn(
                "rounded-full bg-current transition-transform duration-200",
                {
                  "size-2": size === "sm",
                  "size-2.5": size === "md",
                  "size-3": size === "lg",
                  "scale-100": checked,
                  "scale-0": !checked,
                },
              )}
            ></span>
          {/snippet}
        </BitsRadioGroup.Item>

        <div class="space-y-1">
          <Label
            class={cn("cursor-pointer", {
              "text-sm": size === "sm" || size === "md",
              "text-base": size === "lg",
            })}
            for={`${resolvedId}-${item.value}`}
          >
            {item.label}
          </Label>
          {#if item.description}
            <p
              class={cn("text-content-muted leading-relaxed", {
                "text-xs": size === "sm",
                "text-sm": size === "md" || size === "lg",
              })}
            >
              {item.description}
            </p>
          {/if}
        </div>
      </div>
    {/each}
  </BitsRadioGroup.Root>
</div>
