<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Label as BitsLabel } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  const labelSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  } as const;

  const labelColors = {
    default: "text-content",
    muted: "text-content-muted",
  } as const;

  /**
   * Typography size preset of the label.
   */
  type LabelSize = keyof typeof labelSizes;

  /**
   * Text color preset of the label.
   */
  type LabelColor = keyof typeof labelColors;

  interface Props {
    /**
     * Additional CSS classes to apply to the label element.
     */
    class?: ClassValue;

    /**
     * Optional ID for the label element.
     */
    id?: string;

    /**
     * ID of the form control this label is bound to.
     */
    for?: string;

    /**
     * The form element that the label is associated with (its form owner).
     */
    form?: string;

    /**
     * Inner content of the label.
     */
    children?: Snippet;

    /**
     * Typography size preset.
     * @default "md"
     */
    size?: LabelSize;

    /**
     * Text color preset.
     * @default "default"
     */
    color?: LabelColor;

    /**
     * If true, displays a red asterisk indicating the field is required.
     * @default false
     */
    required?: boolean;
  }

  let {
    class: className,
    id,
    for: htmlFor,
    form,
    children,
    size = "md",
    color = "default",
    required = false,
  }: Props = $props();
</script>

<BitsLabel.Root
  {form}
  for={htmlFor}
  {id}
  class={cn(
    // Base layout & typography
    "inline-flex items-center gap-1 font-medium select-none cursor-pointer",
    // Presets
    labelSizes[size],
    labelColors[color],
    className,
  )}
>
  {@render children?.()}
  {#if required}
    <span class="text-error" aria-hidden="true">*</span>
  {/if}
</BitsLabel.Root>
