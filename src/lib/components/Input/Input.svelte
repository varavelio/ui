<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

  interface Props extends Omit<HTMLInputAttributes, "size" | "value"> {
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
     * Marks the input as error and styles it accordingly.
     * @default false
     */
    error?: boolean;

    /**
     * The bound value of the input.
     */
    value?: HTMLInputAttributes["value"];
  }

  let {
    class: className,
    value = $bindable(),
    size = "md",
    radius = "md",
    variant = "default",
    error = false,
    ...restProps
  }: Props = $props();
</script>

<input
  {...restProps}
  aria-invalid={error || undefined}
  bind:value={value as never}
  class={cn(
    // Base layout & typography
    "w-full border text-content placeholder:text-content-muted",
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
      // Error state
      "border-error placeholder:text-error/50": error,
      "hover:border-error": error,
      "focus-visible:border-error focus-visible:ring-error": error,
    },

    // User defined classes
    className,
  )}
>
