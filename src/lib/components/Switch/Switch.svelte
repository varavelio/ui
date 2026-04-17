<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Switch as BitsSwitch } from "bits-ui";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

  interface Props {
    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;

    /**
     * Optional ID for the switch element.
     */
    id?: string;

    /**
     * Label text rendered next to the switch.
     */
    label?: string;

    /**
     * Helper text rendered below the label.
     */
    description?: string;

    /**
     * Bindable checked state of the switch.
     * @default false
     */
    checked?: boolean;

    /**
     * If true, prevents user interaction and dims the control.
     * @default false
     */
    disabled?: boolean;

    /**
     * If true, marks the switch as a required field in a form.
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
     * Visual size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Semantic color representation for the active state.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";
  }

  let {
    class: className,
    id,
    label,
    description,
    checked = $bindable(false),
    disabled = false,
    required = false,
    name,
    value,
    size = "md",
    color = "neutral",
  }: Props = $props();

  const uid = $props.id();
  let resolvedId = $derived(id ?? `${uid}-switch`);
</script>

<div class={cn("flex items-start gap-3", className)}>
  <BitsSwitch.Root
    {disabled}
    {required}
    {name}
    {value}
    bind:checked
    id={resolvedId}
    class={cn(
      // Base layout & surface
      "inline-flex shrink-0 items-center rounded-full border cursor-pointer mt-0.5",
      // Transition
      "transition-[background-color,border-color] duration-200",
      // Focus state
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      {
        // Size presets
        "h-5 w-9 p-0.5": size === "sm",
        "h-6 w-11 p-0.5": size === "md",
        "h-7 w-12 p-0.5": size === "lg",

        // Color presets
        "data-[state=checked]:bg-content data-[state=checked]:border-content data-[state=unchecked]:bg-base-300 focus-visible:outline-content": color === "neutral",
        "data-[state=checked]:bg-info data-[state=checked]:border-info data-[state=unchecked]:bg-base-300 focus-visible:outline-info": color === "info",
        "data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=unchecked]:bg-base-300 focus-visible:outline-success": color === "success",
        "data-[state=checked]:bg-warning data-[state=checked]:border-warning data-[state=unchecked]:bg-base-300 focus-visible:outline-warning": color === "warning",
        "data-[state=checked]:bg-error data-[state=checked]:border-error data-[state=unchecked]:bg-base-300 focus-visible:outline-error": color === "error",
      },
    )}
  >
    <BitsSwitch.Thumb
      class={cn(
        "bg-base-100 block rounded-full transition-transform duration-200",
        {
          "size-4 data-[state=checked]:translate-x-4": size === "sm",
          "size-5 data-[state=checked]:translate-x-5": size === "md",
          "size-6 data-[state=checked]:translate-x-5": size === "lg",
        },
      )}
    />
  </BitsSwitch.Root>

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
