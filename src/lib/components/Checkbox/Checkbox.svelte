<script lang="ts">
  import { Check, Minus } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Checkbox as BitsCheckbox } from "bits-ui";
  import type { ClassValue } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

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
    size?: "sm" | "md" | "lg";

    /**
     * Semantic color representation for the checked state.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "danger";
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

<div
  class={cn(
    "flex items-center",
    {
      "gap-2": size === "sm",
      "gap-3": size === "md" || size === "lg",
    },
    className,
  )}
>
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
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      {
        // Size presets
        "size-4": size === "sm",
        "size-5": size === "md",
        "size-6": size === "lg",

        // Color presets
        "data-[state=checked]:border-content data-[state=checked]:bg-content data-[state=indeterminate]:border-content data-[state=indeterminate]:bg-content text-base-100 focus-visible:outline-content": color === "neutral",
        "data-[state=checked]:border-info data-[state=checked]:bg-info data-[state=indeterminate]:border-info data-[state=indeterminate]:bg-info text-white focus-visible:outline-info": color === "info",
        "data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=indeterminate]:border-success data-[state=indeterminate]:bg-success text-white focus-visible:outline-success": color === "success",
        "data-[state=checked]:border-warning data-[state=checked]:bg-warning data-[state=indeterminate]:border-warning data-[state=indeterminate]:bg-warning text-white focus-visible:outline-warning": color === "warning",
        "data-[state=checked]:border-error data-[state=checked]:bg-error data-[state=indeterminate]:border-error data-[state=indeterminate]:bg-error text-white focus-visible:outline-error": color === "danger",
      },
    )}
  >
    {#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
      {#if isIndeterminate}
        <Minus
          aria-hidden="true"
          class={cn({
            "size-3": size === "sm",
            "size-3.5": size === "md",
            "size-4": size === "lg",
          })}
        />
      {:else if isChecked}
        <Check
          aria-hidden="true"
          class={cn({
            "size-3": size === "sm",
            "size-3.5": size === "md",
            "size-4": size === "lg",
          })}
        />
      {/if}
    {/snippet}
  </BitsCheckbox.Root>

  {#if label || description}
    <div class="space-y-0.5">
      {#if label}
        <Label
          class={cn("cursor-pointer", {
            "text-sm": size === "sm" || size === "md",
            "text-base": size === "lg",
          })}
          for={resolvedId}
        >
          {label}
        </Label>
      {/if}
      {#if description}
        <p
          class={cn("text-content-muted leading-relaxed", {
            "text-xs": size === "sm",
            "text-sm": size === "md" || size === "lg",
          })}
        >
          {description}
        </p>
      {/if}
    </div>
  {/if}
</div>
