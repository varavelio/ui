<script lang="ts">
  import { Check } from "@lucide/svelte";
  import type { Component, Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface HeroSplitAction {
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

  export interface HeroSplitStat {
    value: string;
    label: string;
    description?: string;
  }

  export interface HeroSplitVisual {
    src: string;
    alt: string;
    caption?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    stats?: HeroSplitStat[];
  }

  export interface HeroSplitProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: HeroSplitAction[];
    highlights?: string[];
    stats?: HeroSplitStat[];
    visual: HeroSplitVisual;
    visualContent?: Snippet;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    actions = [],
    highlights = [],
    stats = [],
    visual,
    visualContent,
    ...restProps
  }: HeroSplitProps = $props();

  function resolveTarget(action: HeroSplitAction) {
    return action.target ?? (action.external ? "_blank" : undefined);
  }

  function resolveRel(action: HeroSplitAction) {
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
      class="grid gap-10 desk:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] desk:items-center"
    >
      <div class="space-y-6">
        {#if eyebrow}
          <p
            class="text-xs font-medium uppercase tracking-[0.24em] text-content-muted"
          >
            {eyebrow}
          </p>
        {/if}

        <div class="space-y-4">
          <h1
            class="text-4xl font-semibold tracking-tighter text-content desk:text-6xl"
          >
            {title}
          </h1>

          {#if description}
            <p
              class="max-w-2xl text-lg leading-8 text-content-muted desk:text-xl"
            >
              {description}
            </p>
          {/if}
        </div>

        {#if actions.length}
          <div class="flex flex-wrap gap-3">
            {#each actions as action (`${action.label}-${action.href ?? "button"}`)}
              <Button
                color={action.color ?? "neutral"}
                href={action.href}
                icon={action.icon}
                iconRight={action.iconRight}
                rel={resolveRel(action)}
                size={action.size ?? "lg"}
                target={resolveTarget(action)}
                variant={action.variant ?? "solid"}
              >
                {action.label}
              </Button>
            {/each}
          </div>
        {/if}

        {#if highlights.length}
          <div class="grid gap-3 text-sm text-content-muted sm:grid-cols-2">
            {#each highlights as highlight (highlight)}
              <div
                class="flex items-start gap-3 rounded-md border border-base-400 bg-base-200 px-4 py-3"
              >
                <Check class="mt-0.5 size-4 shrink-0 text-content" />
                <span class="leading-6">{highlight}</span>
              </div>
            {/each}
          </div>
        {/if}

        {#if stats.length}
          <div class="grid gap-4 border-t border-base-400 pt-6 sm:grid-cols-3">
            {#each stats as stat (stat.label)}
              <div class="space-y-2">
                <p class="text-2xl font-semibold tracking-tight text-content">
                  {stat.value}
                </p>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-content">{stat.label}</p>
                  {#if stat.description}
                    <p class="text-sm leading-6 text-content-muted">
                      {stat.description}
                    </p>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <div>
        {#if visualContent}
          {@render visualContent()}
        {:else}
          <Card class="overflow-hidden" padding="none">
            <div class="space-y-3 border-b border-base-400 p-6">
              {#if visual.eyebrow}
                <p
                  class="text-xs font-medium uppercase tracking-[0.2em] text-content-muted"
                >
                  {visual.eyebrow}
                </p>
              {/if}

              {#if visual.title}
                <h2 class="text-xl font-medium tracking-tight text-content">
                  {visual.title}
                </h2>
              {/if}

              {#if visual.description}
                <p class="text-sm leading-6 text-content-muted">
                  {visual.description}
                </p>
              {/if}
            </div>

            <div
              class="aspect-[4/3] overflow-hidden border-b border-base-400 bg-base-300"
            >
              <img
                alt={visual.alt}
                class="size-full object-cover"
                src={visual.src}
              >
            </div>

            {#if visual.caption || visual.stats?.length}
              <div class="space-y-5 p-6">
                {#if visual.caption}
                  <p class="text-sm leading-6 text-content-muted">
                    {visual.caption}
                  </p>
                {/if}

                {#if visual.stats?.length}
                  <div class="grid gap-4 sm:grid-cols-2">
                    {#each visual.stats as stat (stat.label)}
                      <div
                        class="rounded-md border border-base-400 bg-base-100 px-4 py-3"
                      >
                        <p
                          class="text-lg font-semibold tracking-tight text-content"
                        >
                          {stat.value}
                        </p>
                        <p class="mt-1 text-sm text-content-muted">
                          {stat.label}
                        </p>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          </Card>
        {/if}
      </div>
    </div>
  </Container>
</section>
