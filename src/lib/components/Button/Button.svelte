<script lang="ts">
  import { Loader } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
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
    color?: "neutral" | "info" | "success" | "warning" | "danger";

    /**
     * Whether the button should span the full width of its container.
     * @default false
     */
    block?: boolean;

    /**
     * Whether the button is in a loading state.
     * Shows a spinner and disables interaction.
     * @default false
     */
    loading?: boolean;
  }

  let {
    class: className,
    children,
    type = "button",
    size = "md",
    radius = "md",
    variant = "solid",
    color = "neutral",
    block = false,
    loading = false,
    disabled = false,
    ...restProps
  }: Props = $props();
</script>

<button
  {...restProps}
  {type}
  disabled={disabled || loading}
  class={cn(
    // Base layout & typography
    "relative inline-flex items-center justify-center gap-2 border font-medium transition-all duration-75",
    // Interactive states
    "active:scale-95 active:transition-none",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 disabled:active:brightness-100",
    // Focus state
    "focus-visible:outline-2",

    {
      // Size presets
      "h-8 px-3 text-xs": size === "sm",
      "h-10 px-4 text-sm": size === "md",
      "h-12 px-6 text-base": size === "lg",

      // Radius presets
      "rounded-sm": radius === "sm",
      "rounded-md": radius === "md",
      "rounded-lg": radius === "lg",
      "rounded-full": radius === "full",

      // Width modifiers
      "w-full": block,
      "w-auto": !block,

      // Variant: Solid
      ...(variant === "solid" && {
        "focus-visible:outline-offset-2": true,
        "border-content bg-content text-base-100 hover:bg-content/90 active:bg-content outline-content": color === "neutral",
        "border-info bg-info text-white hover:bg-info/90 active:bg-info outline-info": color === "info",
        "border-success bg-success text-white hover:bg-success/90 active:bg-success outline-success": color === "success",
        "border-warning bg-warning text-black hover:bg-warning/90 active:bg-warning outline-warning": color === "warning",
        "border-error bg-error text-white hover:bg-error/90 active:bg-error outline-error": color === "danger",
      }),
      
      // Variant: Outline
      ...(variant === "outline" && {
        "border-base-400 bg-transparent text-content hover:bg-base-300 active:bg-base-400/20 outline-content": color === "neutral",
        "border-info/30 bg-transparent text-info hover:bg-info/10 active:bg-info/20 outline-info": color === "info",
        "border-success/30 bg-transparent text-success hover:bg-success/10 active:bg-success/20 outline-success": color === "success",
        "border-warning/30 bg-transparent text-warning hover:bg-warning/10 active:bg-warning/20 outline-warning": color === "warning",
        "border-error/30 bg-transparent text-error hover:bg-error/10 active:bg-error/20 outline-error": color === "danger",
      }),

      // Variant: Ghost
      ...(variant === "ghost" && {
        "border-transparent bg-transparent text-content hover:bg-base-300 active:bg-base-400/20 outline-content": color === "neutral",
        "border-transparent bg-transparent text-info hover:bg-info/10 active:bg-info/20 outline-info": color === "info",
        "border-transparent bg-transparent text-success hover:bg-success/10 active:bg-success/20 outline-success": color === "success",
        "border-transparent bg-transparent text-warning hover:bg-warning/10 active:bg-warning/20 outline-warning": color === "warning",
        "border-transparent bg-transparent text-error hover:bg-error/10 active:bg-error/20 outline-error": color === "danger",
      }),
    },

    className,
  )}
>
  <div class="flex items-center justify-center gap-2 leading-none">
    {#if loading}
      <Loader class="size-4 animate-spin" />
    {/if}
    {@render children?.()}
  </div>
</button>
