<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

  interface Props extends Omit<HTMLTextareaAttributes, "value"> {
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
     * Marks the textarea as error and styles it accordingly.
     * @default false
     */
    error?: boolean;

    /**
     * Resizing behavior.
     * @default "vertical"
     */
    resize?: "none" | "vertical" | "auto";

    /**
     * The bound value of the textarea.
     */
    value?: HTMLTextareaAttributes["value"];
  }

  let {
    class: className,
    value = $bindable(),
    radius = "md",
    variant = "default",
    error = false,
    resize = "vertical",
    rows = 4,
    ...restProps
  }: Props = $props();
</script>

<textarea
  {...restProps}
  {rows}
  aria-invalid={error || undefined}
  bind:value={value as never}
  class={cn(
    // Base layout & typography
    "w-full border px-3 py-2.5 text-sm text-content placeholder:text-content-muted",
    // Transition and duration
    "transition-colors duration-200",
    // Hover state
    "hover:bg-base-100 hover:border-content",
    // Focus state
    "focus-visible:bg-base-100 focus-visible:border-content",
    // Focus ring
    "focus:outline-none focus-visible:outline-none",
    "focus-visible:ring-1 focus-visible:ring-content",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-base-400",
    
    // Dynamic classes
    {
      // Radius presets
      "rounded-none": radius === "none",
      "rounded-sm": radius === "sm",
      "rounded-md": radius === "md",
      "rounded-lg": radius === "lg",
      "rounded-full": radius === "full",
      // Variant presets
      "bg-base-100 border-base-400": variant === "default",
      "bg-transparent border-transparent": variant === "ghost",
      // Resize behavior
      "resize-none": resize === "none",
      "resize-y": resize === "vertical",
      "resize": resize === "auto",
      // Error state
      "border-error placeholder:text-error/50": error,
      "hover:border-error": error,
      "focus-visible:border-error focus-visible:ring-error": error,
    },

    // User defined classes
    className,
  )}
></textarea>
