<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Accordion as BitsAccordion } from "bits-ui";
  import type { Component } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface FaqSplitAction {
    label: string;
    href?: string;
    target?: HTMLAnchorAttributes["target"];
    rel?: HTMLAnchorAttributes["rel"];
    external?: boolean;
    variant?: "solid" | "outline" | "ghost";
    color?: "neutral" | "info" | "success" | "warning" | "error";
    size?: "sm" | "md" | "lg";
    icon?: Component;
    iconRight?: Component;
  }

  export interface FaqSplitItem {
    question: string;
    answer: string;
  }

  export interface FaqSupport {
    title?: string;
    description?: string;
    action?: FaqSplitAction;
    note?: string;
  }

  export interface FaqSplitProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: FaqSplitItem[];
    support?: FaqSupport;
    openFirst?: boolean;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    support,
    openFirst = true,
    ...restProps
  }: FaqSplitProps = $props();

  function resolveTarget(action: FaqSplitAction) {
    return action.target ?? (action.external ? "_blank" : undefined);
  }

  function resolveRel(action: FaqSplitAction) {
    if (action.rel) {
      return action.rel;
    }

    return resolveTarget(action) === "_blank"
      ? "noopener noreferrer"
      : undefined;
  }
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="lg" padded>
    <div
      class="grid gap-8 desk:grid-cols-[minmax(0,360px)_minmax(0,1fr)] desk:gap-12"
    >
      <div class="space-y-6">
        {#if eyebrow || title || description}
          <div class="flex flex-col gap-4 text-left">
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

        {#if support?.title || support?.description || support?.note || support?.action}
          <div
            class="space-y-4 rounded-lg border border-base-400 bg-base-200 p-6"
          >
            {#if support?.title}
              <h3 class="text-lg font-medium tracking-tight text-content">
                {support.title}
              </h3>
            {/if}

            {#if support?.description}
              <p class="text-sm leading-6 text-content-muted desk:text-base">
                {support.description}
              </p>
            {/if}

            {#if support?.action}
              <div class="flex flex-wrap gap-3">
                <Button
                  color={support.action.color ?? "neutral"}
                  href={support.action.href}
                  icon={support.action.icon}
                  iconRight={support.action.iconRight}
                  rel={resolveRel(support.action)}
                  size={support.action.size ?? "md"}
                  target={resolveTarget(support.action)}
                  variant={support.action.variant ?? "solid"}
                >
                  {support.action.label}
                </Button>
              </div>
            {/if}

            {#if support?.note}
              <p class="text-sm text-content-muted">{support.note}</p>
            {/if}
          </div>
        {/if}
      </div>

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
