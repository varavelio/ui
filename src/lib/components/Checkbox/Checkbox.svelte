<script lang="ts">
  import { Check, Minus } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Checkbox as BitsCheckbox } from "bits-ui";
  import type { ClassValue } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

  const checkboxSizes = {
    sm: {
      box: "size-4",
      icon: "size-3",
      gap: "gap-2",
      title: "text-sm",
      description: "text-xs",
    },
    md: {
      box: "size-5",
      icon: "size-3.5",
      gap: "gap-3",
      title: "text-sm",
      description: "text-sm",
    },
    lg: {
      box: "size-6",
      icon: "size-4",
      gap: "gap-3",
      title: "text-base",
      description: "text-sm",
    },
  } as const;

  const checkboxColors = {
    neutral:
      "data-[state=checked]:border-content data-[state=checked]:bg-content data-[state=indeterminate]:border-content data-[state=indeterminate]:bg-content text-base-100",
    info: "data-[state=checked]:border-info data-[state=checked]:bg-info data-[state=indeterminate]:border-info data-[state=indeterminate]:bg-info text-white",
    success:
      "data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=indeterminate]:border-success data-[state=indeterminate]:bg-success text-black",
    danger:
      "data-[state=checked]:border-error data-[state=checked]:bg-error data-[state=indeterminate]:border-error data-[state=indeterminate]:bg-error text-white",
  } as const;

  /**
   * Compactness preset for the checkbox.
   */
  type CheckboxSize = keyof typeof checkboxSizes;

  /**
   * Semantic color preset for the checked state.
   */
  type CheckboxColor = keyof typeof checkboxColors;

  interface Props {
    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;

    /**
     * Optional ID for the checkbox element.
     */
    id?: string;

    /**
     * Label text rendered next to the checkbox.
     */
    label?: string;

    /**
     * Helper text rendered below the label.
     */
    description?: string;

    /**
     * Checked state of the checkbox.
     * @default false
     */
    checked?: boolean;

    /**
     * Indeterminate state of the checkbox (shows a dash).
     * @default false
     */
    indeterminate?: boolean;

    /**
     * If true, prevents user interaction and dims the control.
     * @default false
     */
    disabled?: boolean;

    /**
     * If true, prevents user interaction but retains normal styling.
     * @default false
     */
    readonly?: boolean;

    /**
     * If true, marks the checkbox as a required field in a form.
     * @default false
     */
    required?: boolean;

    /**
     * HTML input name attribute for form submission.
     */
    name?: string;

    /**
     * HTML input value attribute for form submission.
     */
    value?: string;

    /**
     * Visual size preset of the checkbox.
     * @default "md"
     */
    size?: CheckboxSize;

    /**
     * Semantic color representation for the checked state.
     * @default "neutral"
     */
    color?: CheckboxColor;
  }

  let {
    class: className,
    id,
    label,
    description,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    disabled = false,
    readonly = false,
    required = false,
    name,
    value,
    size = "md",
    color = "neutral",
  }: Props = $props();

  const uid = $props.id();
  let resolvedId = $derived(id ?? `${uid}-checkbox`);
</script>

<div class={cn("flex items-start", checkboxSizes[size].gap, className)}>
  <BitsCheckbox.Root
    {disabled}
    {readonly}
    {required}
    {name}
    {value}
    bind:checked
    bind:indeterminate
    id={resolvedId}
    class={cn(
      // Base layout & typography
      "border-base-400 bg-base-100 inline-flex shrink-0 items-center justify-center rounded-sm border transition-colors duration-200",
      // Focus states
      "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-base-400 focus-visible:ring-offset-2",
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Presets
      checkboxSizes[size].box,
      checkboxColors[color],
    )}
  >
    {#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
      {#if isIndeterminate}
        <Minus aria-hidden="true" class={checkboxSizes[size].icon} />
      {:else if isChecked}
        <Check aria-hidden="true" class={checkboxSizes[size].icon} />
      {/if}
    {/snippet}
  </BitsCheckbox.Root>

  {#if label || description}
    <div class="space-y-1">
      {#if label}
        <Label
          class={cn("cursor-pointer", checkboxSizes[size].title)}
          for={resolvedId}
          >{label}</Label
        >
      {/if}
      {#if description}
        <p
          class={cn("text-content-muted leading-relaxed", checkboxSizes[size].description)}
        >
          {description}
        </p>
      {/if}
    </div>
  {/if}
</div>
