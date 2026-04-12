<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Accordion as BitsAccordion } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type AccordionItem = {
    value: string;
    label: string;
    content: Snippet;
    disabled?: boolean;
  };

  interface Props {
    /**
     * Additional CSS classes to apply to the accordion root element.
     */
    class?: ClassValue;
    /**
     * The items to display in the accordion.
     */
    items: AccordionItem[];
    /**
     * The type of accordion. Single allows only one item to be open at a time. Multiple allows multiple items to be open.
     */
    type?: "single" | "multiple";
    /**
     * The currently selected value(s).
     */
    value?: string | string[];
    /**
     * The size of the accordion items.
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
  }

  let {
    class: className,
    items,
    type = "single",
    value = $bindable(),
    size = "md",
    showIcon = true,
    iconPosition = "left",
    bg = "200",
  }: Props = $props();
</script>

<BitsAccordion.Root
  bind:value={value as never}
  class={cn(
    "border-base-400 w-full rounded-lg border px-4",
    {
      "bg-base-100": bg === "100",
      "bg-base-200": bg === "200",
      "bg-base-300": bg === "300",
    },
    className,
  )}
  {type}
>
  {#each items as item (item.value)}
    <BitsAccordion.Item
      class="group border-b border-base-400 last:border-b-0"
      disabled={item.disabled}
      value={item.value}
    >
      <BitsAccordion.Header>
        <BitsAccordion.Trigger
          class={cn(
            "flex w-full items-center gap-4 text-left font-medium focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content",
            {
              "py-3 text-sm": size === "sm",
              "py-4 text-sm": size === "md",
              "py-5 text-base": size === "lg",
            },
            item.disabled && "opacity-50 cursor-not-allowed",
            iconPosition === "left" ? "flex-row-reverse" : "flex-row"
          )}
        >
          <span class="flex-1">{item.label}</span>
          {#if showIcon}
            <ChevronDown
              aria-hidden="true"
              class="text-content-muted size-5 shrink-0 transition-transform group-data-[state=open]:rotate-180"
            />
          {/if}
        </BitsAccordion.Trigger>
      </BitsAccordion.Header>

      <BitsAccordion.Content class="varavel-accordion-content overflow-hidden">
        <div
          class={cn("text-content-muted leading-relaxed", {
            "pb-3 text-sm": size === "sm",
            "pb-4 text-sm": size === "md",
            "pb-5 text-base": size === "lg",
          })}
        >
          {@render item.content()}
        </div>
      </BitsAccordion.Content>
    </BitsAccordion.Item>
  {/each}
</BitsAccordion.Root>

<style>
  :global(.varavel-accordion-content[data-state="open"]) {
    animation: accordion-down 0.2s ease-out;
  }
  :global(.varavel-accordion-content[data-state="closed"]) {
    animation: accordion-up 0.2s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.varavel-accordion-content[data-state="open"]),
    :global(.varavel-accordion-content[data-state="closed"]) {
      animation: none;
    }
  }

  @keyframes -global-accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(--bits-accordion-content-height);
    }
  }

  @keyframes -global-accordion-up {
    from {
      height: var(--bits-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
</style>
