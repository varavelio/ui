<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Accordion as BitsAccordion } from "bits-ui";
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface FaqAccordionItem {
    question: string;
    answer: string;
  }

  export interface FaqAccordionProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: FaqAccordionItem[];
    openFirst?: boolean;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    openFirst = true,
    ...restProps
  }: FaqAccordionProps = $props();
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="md" padded>
    <div class="space-y-10">
      {#if eyebrow || title || description}
        <div class="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          {#if eyebrow}
            <p
              class="text-xs font-medium uppercase tracking-[0.24em] text-content-muted"
            >
              {eyebrow}
            </p>
          {/if}

          {#if title}
            <h2
              class="text-3xl font-semibold tracking-tight text-content desk:text-4xl"
            >
              {title}
            </h2>
          {/if}

          {#if description}
            <p class="text-base leading-7 text-content-muted desk:text-lg">
              {description}
            </p>
          {/if}
        </div>
      {/if}

      <BitsAccordion.Root
        class="w-full rounded-lg border border-base-400 bg-base-200 px-5"
        type="single"
        value={openFirst ? items[0]?.question : undefined}
      >
        {#each items as item (item.question)}
          <BitsAccordion.Item
            class="group border-b border-base-400 last:border-b-0"
            value={item.question}
          >
            <BitsAccordion.Header>
              <BitsAccordion.Trigger
                class="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-medium text-content focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  class="size-5 shrink-0 text-content-muted transition-transform group-data-[state=open]:rotate-180"
                />
              </BitsAccordion.Trigger>
            </BitsAccordion.Header>

            <BitsAccordion.Content class="varavel-faq-content overflow-hidden">
              <div
                class="pb-5 text-sm leading-7 text-content-muted desk:text-base"
              >
                <p>{item.answer}</p>
              </div>
            </BitsAccordion.Content>
          </BitsAccordion.Item>
        {/each}
      </BitsAccordion.Root>
    </div>
  </Container>
</section>

<style>
  :global(.varavel-faq-content[data-state="open"]) {
    animation: faq-down 0.2s ease-out;
  }

  :global(.varavel-faq-content[data-state="closed"]) {
    animation: faq-up 0.2s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.varavel-faq-content[data-state="open"]),
    :global(.varavel-faq-content[data-state="closed"]) {
      animation: none;
    }
  }

  @keyframes -global-faq-down {
    from {
      height: 0;
    }

    to {
      height: var(--bits-accordion-content-height);
    }
  }

  @keyframes -global-faq-up {
    from {
      height: var(--bits-accordion-content-height);
    }

    to {
      height: 0;
    }
  }
</style>
