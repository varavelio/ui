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

    /**
     * Whether the button is in an active state.
     * Forces the hover style.
     * @default false
     */
    active?: boolean;
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
    active = false,
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
    "active:translate-y-px active:transition-none",
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
        "border-content bg-content text-base-100 outline-content": color === "neutral",
        "bg-content/90": color === "neutral" && active,
        "hover:bg-content/90 active:bg-content": color === "neutral",

        "border-info bg-info text-white outline-info": color === "info",
        "bg-info/90": color === "info" && active,
        "hover:bg-info/90 active:bg-info": color === "info",

        "border-success bg-success text-white outline-success": color === "success",
        "bg-success/90": color === "success" && active,
        "hover:bg-success/90 active:bg-success": color === "success",

        "border-warning bg-warning text-white outline-warning": color === "warning",
        "bg-warning/90": color === "warning" && active,
        "hover:bg-warning/90 active:bg-warning": color === "warning",

        "border-error bg-error text-white outline-error": color === "danger",
        "bg-error/90": color === "danger" && active,
        "hover:bg-error/90 active:bg-error": color === "danger",
      }),

      // Variant: Outline
      ...(variant === "outline" && {
        "border-base-400 bg-transparent text-content outline-content": color === "neutral",
        "bg-base-300": color === "neutral" && active,
        "hover:bg-base-300 active:bg-base-400/20": color === "neutral",

        "border-info/30 bg-transparent text-info outline-info": color === "info",
        "bg-info/10": color === "info" && active,
        "hover:bg-info/10 active:bg-info/20": color === "info",

        "border-success/30 bg-transparent text-success outline-success": color === "success",
        "bg-success/10": color === "success" && active,
        "hover:bg-success/10 active:bg-success/20": color === "success",

        "border-warning/30 bg-transparent text-warning outline-warning": color === "warning",
        "bg-warning/10": color === "warning" && active,
        "hover:bg-warning/10 active:bg-warning/20": color === "warning",

        "border-error/30 bg-transparent text-error outline-error": color === "danger",
        "bg-error/10": color === "danger" && active,
        "hover:bg-error/10 active:bg-error/20": color === "danger",
      }),

      // Variant: Ghost
      ...(variant === "ghost" && {
        "border-transparent bg-transparent text-content outline-content": color === "neutral",
        "bg-base-300": color === "neutral" && active,
        "hover:bg-base-300 active:bg-base-400/20": color === "neutral",

        "border-transparent bg-transparent text-info outline-info": color === "info",
        "bg-info/10": color === "info" && active,
        "hover:bg-info/10 active:bg-info/20": color === "info",

        "border-transparent bg-transparent text-success outline-success": color === "success",
        "bg-success/10": color === "success" && active,
        "hover:bg-success/10 active:bg-success/20": color === "success",

        "border-transparent bg-transparent text-warning outline-warning": color === "warning",
        "bg-warning/10": color === "warning" && active,
        "hover:bg-warning/10 active:bg-warning/20": color === "warning",

        "border-transparent bg-transparent text-error outline-error": color === "danger",
        "bg-error/10": color === "danger" && active,
        "hover:bg-error/10 active:bg-error/20": color === "danger",
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
