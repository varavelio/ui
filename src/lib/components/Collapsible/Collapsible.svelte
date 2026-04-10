<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Collapsible as BitsCollapsible } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the collapsible root.
     */
    class?: ClassValue;
    /**
     * Controls the expanded state of the collapsible.
     */
    open?: boolean;
    /**
     * The heading shown in the collapsible header.
     */
    title: string;
    /**
     * Optional supporting text under the title.
     */
    description?: string;
    /**
     * The size of the collapsible items.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * Whether to show the expand/collapse icon.
     * @default true
     */
    showIcon?: boolean;
    /**
     * The position of the expand/collapse icon.
     * @default "left"
     */
    iconPosition?: "left" | "right";
    /**
     * The background color preset.
     * @default "200"
     */
    bg?: "100" | "200" | "300";
    /**
     * The content to reveal when expanded.
     */
    children?: Snippet;
  }

  let {
    class: className,
    open = $bindable(false),
    title,
    description,
    size = "md",
    showIcon = true,
    iconPosition = "left",
    bg = "200",
    children,
  }: Props = $props();
</script>

<BitsCollapsible.Root
  bind:open
  class={cn(
    "border-base-400 w-full rounded-lg border px-4",
    {
      "bg-base-100": bg === "100",
      "bg-base-200": bg === "200",
      "bg-base-300": bg === "300",
    },
    className,
  )}
>
  <BitsCollapsible.Trigger
    class={cn(
      "group flex w-full items-start gap-4 text-left font-medium focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content",
      {
        "py-3 text-sm": size === "sm",
        "py-4 text-sm": size === "md",
        "py-5 text-base": size === "lg",
      },
      iconPosition === "left" ? "flex-row-reverse" : "flex-row",
    )}
  >
    <div class="flex-1 space-y-1">
      <h3 class="text-content">{title}</h3>
      {#if description}
        <p class="text-sm font-normal text-content-muted">{description}</p>
      {/if}
    </div>

    {#if showIcon}
      <ChevronDown
        aria-hidden="true"
        class={cn(
          "text-content-muted size-5 shrink-0 transition-transform",
          {
            "mt-0.5": size === "sm" || size === "md",
            "mt-1": size === "lg",
          },
          open ? "rotate-180" : "",
        )}
      />
    {/if}
  </BitsCollapsible.Trigger>

  <BitsCollapsible.Content class="varavel-collapsible-content overflow-hidden">
    <div
      class={cn("text-content-muted leading-relaxed", {
        "pb-3 text-sm": size === "sm",
        "pb-4 text-sm": size === "md",
        "pb-5 text-base": size === "lg",
      })}
    >
      {@render children?.()}
    </div>
  </BitsCollapsible.Content>
</BitsCollapsible.Root>

<style>
  :global(.varavel-collapsible-content[data-state="open"]) {
    animation: collapsible-down 0.2s ease-out;
  }
  :global(.varavel-collapsible-content[data-state="closed"]) {
    animation: collapsible-up 0.2s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.varavel-collapsible-content[data-state="open"]),
    :global(.varavel-collapsible-content[data-state="closed"]) {
      animation: none;
    }
  }

  @keyframes -global-collapsible-down {
    from {
      height: 0;
    }
    to {
      height: var(--bits-collapsible-content-height);
    }
  }

  @keyframes -global-collapsible-up {
    from {
      height: var(--bits-collapsible-content-height);
    }
    to {
      height: 0;
    }
  }
</style>
