<script lang="ts">
  import type { ClassValue, HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Label from "../Label/Label.svelte";

  interface Props
    extends Omit<HTMLInputAttributes, "class" | "size" | "type" | "value"> {
    /**
     * Additional CSS classes to apply to the root wrapper.
     */
    class?: ClassValue;

    /**
     * Label text for the color field.
     */
    label?: string;

    /**
     * Secondary helper text rendered below the label.
     */
    description?: string;

    /**
     * Visual size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Corner radius preset.
     * @default "md"
     */
    radius?: "none" | "sm" | "md" | "lg" | "full";

    /**
     * Surface variant.
     * @default "default"
     */
    variant?: "default" | "ghost";

    /**
     * Marks the field as error and styles it accordingly.
     * @default false
     */
    error?: boolean;

    /**
     * The bound color value.
     * @default "#000000"
     */
    value?: string;
  }

  let {
    class: className,
    id,
    label,
    description,
    value = $bindable("#000000"),
    size = "md",
    radius = "md",
    variant = "default",
    error = false,
    disabled = false,
    ...restProps
  }: Props = $props();

  const uid = $props.id();
  let resolvedId = $derived(id ?? `${uid}-color-picker`);
  let labelId = $derived(label ? `${resolvedId}-label` : undefined);
  let descriptionId = $derived(
    description ? `${resolvedId}-description` : undefined,
  );
  let displayValue = $derived((value || "#000000").toUpperCase());
  let inputRef = $state<HTMLInputElement | null>(null);

  function openColorPicker() {
    if (!inputRef || disabled) {
      return;
    }

    if (typeof inputRef.showPicker === "function") {
      inputRef.showPicker();
      return;
    }

    inputRef.click();
  }
</script>

<div class={cn("space-y-2", className)}>
  {#if label || description}
    <div class="space-y-1">
      {#if label}
        <Label id={labelId}>{label}</Label>
      {/if}

      {#if description}
        <p id={descriptionId} class="text-sm text-content-muted">
          {description}
        </p>
      {/if}
    </div>
  {/if}

  <div class="relative">
    <button
      aria-describedby={descriptionId}
      aria-label={label ? undefined : `Pick color ${displayValue}`}
      aria-labelledby={labelId}
      class={cn(
        "relative flex w-full items-center gap-2 border text-content transition-colors duration-200",
        "hover:bg-base-100 hover:border-content",
        "focus-visible:bg-base-100 focus-visible:border-content",
        "focus:outline-none focus-visible:outline-none",
        "focus-visible:ring-1 focus-visible:ring-content",
        {
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-3 text-sm": size === "md",
          "h-12 px-4 text-base": size === "lg",
          "rounded-none": radius === "none",
          "rounded-sm": radius === "sm",
          "rounded-md": radius === "md",
          "rounded-lg": radius === "lg",
          "rounded-full": radius === "full",
          "bg-base-100 border-base-400": variant === "default",
          "bg-transparent border-transparent": variant === "ghost",
          "border-error hover:border-error": error,
          "focus-visible:border-error focus-visible:ring-error": error,
          "cursor-pointer": !disabled,
          "cursor-not-allowed opacity-50 hover:border-base-400": disabled,
        },
      )}
      {disabled}
      onclick={openColorPicker}
      type="button"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none inline-flex size-5 shrink-0 overflow-hidden rounded-sm border-2 border-content"
      >
        <span
          class="size-full"
          style={`background-color: ${displayValue};`}
        ></span>
      </span>

      <span class="pointer-events-none font-mono text-content-muted">
        {displayValue}
      </span>
    </button>

    <input
      {...restProps}
      aria-invalid={error || undefined}
      bind:this={inputRef}
      bind:value
      class="sr-only"
      {disabled}
      id={resolvedId}
      tabindex={-1}
      type="color"
    >
  </div>
</div>
