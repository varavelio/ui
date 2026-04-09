<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  import { cn } from "../../helpers/cn.js";

  const buttonSizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  } as const;

  const buttonRadius = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  } as const;

  const buttonStyles = {
    solid: {
      neutral:
        "border-content bg-content text-base-100 hover:bg-content/90 active:bg-content",
      info: "border-info bg-info text-white hover:bg-info/90 active:bg-info",
      success:
        "border-success bg-success text-black hover:bg-success/90 active:bg-success",
      warning:
        "border-warning bg-warning text-black hover:bg-warning/90 active:bg-warning",
      danger:
        "border-error bg-error text-white hover:bg-error/90 active:bg-error",
    },
    outline: {
      neutral:
        "border-base-400 bg-transparent text-content hover:bg-base-300 active:bg-base-400/20",
      info: "border-info/30 bg-transparent text-info hover:bg-info/10 active:bg-info/20",
      success:
        "border-success/30 bg-transparent text-success hover:bg-success/10 active:bg-success/20",
      warning:
        "border-warning/30 bg-transparent text-warning hover:bg-warning/10 active:bg-warning/20",
      danger:
        "border-error/30 bg-transparent text-error hover:bg-error/10 active:bg-error/20",
    },
    ghost: {
      neutral:
        "border-transparent bg-transparent text-content hover:bg-base-300 active:bg-base-400/20",
      info: "border-transparent bg-transparent text-info hover:bg-info/10 active:bg-info/20",
      success:
        "border-transparent bg-transparent text-success hover:bg-success/10 active:bg-success/20",
      warning:
        "border-transparent bg-transparent text-warning hover:bg-warning/10 active:bg-warning/20",
      danger:
        "border-transparent bg-transparent text-error hover:bg-error/10 active:bg-error/20",
    },
  } as const;

  /**
   * Button size preset.
   */
  type ButtonSize = keyof typeof buttonSizes;

  /**
   * Button border radius preset.
   */
  type ButtonRadius = keyof typeof buttonRadius;

  /**
   * Button appearance variant.
   */
  type ButtonVariant = keyof typeof buttonStyles;

  /**
   * Semantic color for the button.
   */
  type ButtonColor = keyof (typeof buttonStyles)["solid"];

  interface Props extends HTMLButtonAttributes {
    /**
     * Inner content of the button.
     */
    children?: Snippet;

    /**
     * Button size preset.
     * @default "md"
     */
    size?: ButtonSize;

    /**
     * Button border radius preset.
     * @default "md"
     */
    radius?: ButtonRadius;

    /**
     * Button appearance variant.
     * @default "solid"
     */
    variant?: ButtonVariant;

    /**
     * Semantic color representing the button's intent.
     * @default "neutral"
     */
    color?: ButtonColor;

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
    "relative inline-flex items-center justify-center gap-2 border font-medium outline-hidden transition-all duration-75",
    // Interactive states
    "active:scale-95 active:transition-none",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 disabled:active:brightness-100",
    // Focus state
    "focus-visible:ring-2 focus-visible:ring-base-400 focus-visible:ring-offset-2",
    // Dynamic presets
    buttonSizes[size],
    buttonRadius[radius],
    buttonStyles[variant][color],
    // Width modifiers
    block ? "w-full" : "w-auto",
    className,
  )}
>
  <div class="flex items-center justify-center gap-2 leading-none">
    {#if loading}
      <span
        aria-hidden="true"
        class="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
      ></span>
    {/if}
    {@render children?.()}
  </div>
</button>
