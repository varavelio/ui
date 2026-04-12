<script lang="ts">
  import { Loader } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { fade } from "svelte/transition";
  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLButtonAttributes {
    /**
     * Inner content of the button.
     */
    children?: Snippet;

    /**
     * Button size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Button border radius preset.
     * @default "md"
     */
    radius?: "sm" | "md" | "lg" | "full";

    /**
     * Button appearance variant.
     * @default "solid"
     */
    variant?: "solid" | "outline" | "ghost";

    /**
     * Semantic color representing the button's intent.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";

    /**
     * Whether the button should span the full width of its container.
     * @default false
     */
    wide?: boolean;

    /**
     * Whether the button is in a loading state.
     * Shows a spinner and disables interaction.
     * @default false
     */
    loading?: boolean;

    /**
     * Whether the button is in an active state.
     * Forces the hover style.
     * @default false
     */
    active?: boolean;

    /**
     * Internal content alignment.
     * @default "center"
     */
    alignContent?: "left" | "center" | "right" | "between";

    /**
     * Whether the button should have a square aspect ratio.
     * If true, width will match height and horizontal padding will be removed.
     * @default false
     */
    square?: boolean;
  }

  let {
    class: className,
    children,
    type = "button",
    size = "md",
    radius = "md",
    variant = "solid",
    color = "neutral",
    wide = false,
    loading = false,
    active = false,
    disabled = false,
    alignContent = "center",
    square = false,
    ...restProps
  }: Props = $props();

  let disabledOrLoading = $derived(disabled || loading);
</script>

<button
  {...restProps}
  {type}
  disabled={disabledOrLoading}
  class={cn(
    // Base layout & typography
    "relative inline-flex items-center gap-2 border font-medium transition-all duration-75",
    "cursor-pointer select-none",

    // Focus state
    "focus-visible:outline-2",
    
    {
      // Interactive states
      "active:translate-y-px": !disabledOrLoading,

      // Disabled state
      "cursor-not-allowed opacity-50": disabled,

      // Loading state
      "cursor-wait": loading,

      // Size presets
      "h-8 px-3 text-xs": size === "sm" && !square,
      "h-10 px-4 text-sm": size === "md" && !square,
      "h-12 px-6 text-base": size === "lg" && !square,

      // Square presets
      "size-8 p-0 text-xs": size === "sm" && square,
      "size-10 p-0 text-sm": size === "md" && square,
      "size-12 p-0 text-base": size === "lg" && square,

      // Width modifiers
      "w-full": wide,
      "w-auto": !wide && !square,

      // Radius presets
      "rounded-sm": radius === "sm",
      "rounded-md": radius === "md",
      "rounded-lg": radius === "lg",
      "rounded-full": radius === "full",

      // Variant: Solid
      ...(variant === "solid" && {
        "focus-visible:outline-offset-2": true,
        "border-content bg-content text-base-100 outline-content": color === "neutral",
        "bg-content/80 border-content/80": color === "neutral" && active,
        "hover:bg-content/80": color === "neutral" && !disabledOrLoading,

        "border-info bg-info text-white outline-info": color === "info",
        "bg-info/80 border-info/80": color === "info" && active,
        "hover:bg-info/80": color === "info" && !disabledOrLoading,

        "border-success bg-success text-white outline-success": color === "success",
        "bg-success/80 border-success/80": color === "success" && active,
        "hover:bg-success/80": color === "success" && !disabledOrLoading,

        "border-warning bg-warning text-white outline-warning": color === "warning",
        "bg-warning/80 border-warning/80": color === "warning" && active,
        "hover:bg-warning/80": color === "warning" && !disabledOrLoading,

        "border-error bg-error text-white outline-error": color === "error",
        "bg-error/80 border-error/80": color === "error" && active,
        "hover:bg-error/80": color === "error" && !disabledOrLoading,
      }),

      // Variant: Outline
      ...(variant === "outline" && {
        "border-base-400 bg-transparent text-content outline-content": color === "neutral",
        "bg-base-300": color === "neutral" && active,
        "hover:bg-base-300": color === "neutral" && !disabledOrLoading,

        "border-info/30 bg-transparent text-info outline-info": color === "info",
        "bg-info/10": color === "info" && active,
        "hover:bg-info/10": color === "info" && !disabledOrLoading,

        "border-success/30 bg-transparent text-success outline-success": color === "success",
        "bg-success/10": color === "success" && active,
        "hover:bg-success/10": color === "success" && !disabledOrLoading,

        "border-warning/30 bg-transparent text-warning outline-warning": color === "warning",
        "bg-warning/10": color === "warning" && active,
        "hover:bg-warning/10": color === "warning" && !disabledOrLoading,

        "border-error/30 bg-transparent text-error outline-error": color === "error",
        "bg-error/10": color === "error" && active,
        "hover:bg-error/10": color === "error" && !disabledOrLoading,
      }),

      // Variant: Ghost
      ...(variant === "ghost" && {
        "border-transparent bg-transparent text-content outline-content": color === "neutral",
        "bg-base-300": color === "neutral" && active,
        "hover:bg-base-300": color === "neutral" && !disabledOrLoading,

        "border-transparent bg-transparent text-info outline-info": color === "info",
        "bg-info/10": color === "info" && active,
        "hover:bg-info/10": color === "info" && !disabledOrLoading,

        "border-transparent bg-transparent text-success outline-success": color === "success",
        "bg-success/10": color === "success" && active,
        "hover:bg-success/10": color === "success" && !disabledOrLoading,

        "border-transparent bg-transparent text-warning outline-warning": color === "warning",
        "bg-warning/10": color === "warning" && active,
        "hover:bg-warning/10": color === "warning" && !disabledOrLoading,

        "border-transparent bg-transparent text-error outline-error": color === "error",
        "bg-error/10": color === "error" && active,
        "hover:bg-error/10": color === "error" && !disabledOrLoading,
      }),
    },

    className,
  )}
>
  {#if loading}
    <div
      class="absolute inset-0 flex items-center justify-center"
      in:fade={{ duration: 100 }}
    >
      <Loader class="size-4 animate-spin" />
    </div>
  {/if}

  <div
    class={cn(
      "inline-flex items-center gap-2 leading-none w-full",  
      {
        "invisible": loading,
        "justify-center": alignContent === "center",
        "justify-start": alignContent === "left",
        "justify-end": alignContent === "right",
        "justify-between": alignContent === "between",
      }
    )}
  >
    {@render children?.()}
  </div>
</button>
