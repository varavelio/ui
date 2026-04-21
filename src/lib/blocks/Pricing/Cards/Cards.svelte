<script lang="ts">
  import { Check } from "@lucide/svelte";
  import type { Component, Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface PricingCardsAction {
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

  export interface PricingCardPlan {
    id: string;
    name: string;
    price: string;
    period?: string;
    description?: string;
    badge?: string;
    featured?: boolean;
    cta: PricingCardsAction;
    features: string[];
    footnote?: string;
  }

  export interface PricingCardsProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    plans: PricingCardPlan[];
    disclaimer?: string;
    plan?: Snippet<[PricingCardPlan]>;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    plans,
    disclaimer,
    plan,
    ...restProps
  }: PricingCardsProps = $props();
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="lg" padded>
    <div class="space-y-10 desk:space-y-12">
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

      <div class="grid grid-cols-1 gap-6 desk:grid-cols-3">
        {#each plans as entry (entry.id)}
          {#if plan}
            {@render plan(entry)}
          {:else}
            <Card
              class={cn(
                "flex h-full flex-col gap-6 p-6",
                {
                  "border-content bg-base-100 shadow-md desk:-translate-y-2": entry.featured,
                },
              )}
            >
              <div class="space-y-4">
                <div class="flex items-start justify-between gap-4">
                  <div class="space-y-2">
                    <h3 class="text-xl font-medium tracking-tight text-content">
                      {entry.name}
                    </h3>

                    {#if entry.description}
                      <p class="text-sm leading-6 text-content-muted">
                        {entry.description}
                      </p>
                    {/if}
                  </div>

                  {#if entry.badge}
                    <span
                      class="rounded-full border border-base-400 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-content-muted"
                    >
                      {entry.badge}
                    </span>
                  {/if}
                </div>

                <div class="border-t border-base-400 pt-4">
                  <div class="flex items-end gap-2">
                    <span
                      class="text-4xl font-semibold tracking-tight text-content"
                    >
                      {entry.price}
                    </span>

                    {#if entry.period}
                      <span class="pb-1 text-sm text-content-muted">
                        {entry.period}
                      </span>
                    {/if}
                  </div>

                  {#if entry.footnote}
                    <p class="mt-2 text-sm text-content-muted">
                      {entry.footnote}
                    </p>
                  {/if}
                </div>
              </div>

              <Button
                color={entry.cta.color ?? "neutral"}
                href={entry.cta.href}
                icon={entry.cta.icon}
                iconRight={entry.cta.iconRight}
                rel={entry.cta.rel}
                size={entry.cta.size ?? "lg"}
                target={entry.cta.target}
                variant={entry.cta.variant ?? (entry.featured ? "solid" : "outline")}
                wide
              >
                {entry.cta.label}
              </Button>

              <div class="space-y-3 border-t border-base-400 pt-5">
                {#each entry.features as feature (feature)}
                  <div
                    class="flex items-start gap-3 text-sm leading-6 text-content-muted"
                  >
                    <Check class="mt-1 size-4 shrink-0 text-content" />
                    <span>{feature}</span>
                  </div>
                {/each}
              </div>
            </Card>
          {/if}
        {/each}
      </div>

      {#if disclaimer}
        <p class="text-center text-sm text-content-muted">{disclaimer}</p>
      {/if}
    </div>
  </Container>
</section>
