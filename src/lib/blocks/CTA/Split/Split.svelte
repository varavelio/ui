<script lang="ts">
  import { Check } from "@lucide/svelte";
  import type { Component, Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface CTASplitAction {
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

  export interface CTASplitImage {
    src: string;
    alt: string;
    caption?: string;
    eyebrow?: string;
  }

  export interface CTASplitProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    actions: CTASplitAction[];
    image?: CTASplitImage;
    highlights?: string[];
    visual?: Snippet;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    actions,
    image,
    highlights = [],
    visual,
    ...restProps
  }: CTASplitProps = $props();

  function resolveTarget(action: CTASplitAction) {
    return action.target ?? (action.external ? "_blank" : undefined);
  }

  function resolveRel(action: CTASplitAction) {
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
      class="grid gap-8 rounded-lg border border-base-400 bg-base-200 p-6 desk:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] desk:items-center desk:gap-10 desk:p-8"
    >
      <div class="space-y-6">
        {#if eyebrow || title || description}
          <div class="flex max-w-2xl flex-col gap-4 text-left">
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

        {#if highlights.length}
          <div class="grid gap-3 text-sm text-content-muted sm:grid-cols-2">
            {#each highlights as highlight (highlight)}
              <div
                class="flex items-start gap-3 rounded-md border border-base-400 bg-base-100 px-4 py-3"
              >
                <Check class="mt-1 size-4 shrink-0 text-content" />
                <span class="leading-6">{highlight}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <div>
        {#if visual}
          {@render visual()}
        {:else if image}
          <Card class="overflow-hidden" padding="none">
            {#if image.eyebrow}
              <div class="border-b border-base-400 px-5 py-4">
                <p
                  class="text-xs font-medium uppercase tracking-[0.2em] text-content-muted"
                >
                  {image.eyebrow}
                </p>
              </div>
            {/if}

            <div class="aspect-[4/3] overflow-hidden bg-base-300">
              <img
                alt={image.alt}
                class="size-full object-cover"
                src={image.src}
              >
            </div>

            {#if image.caption}
              <div class="border-t border-base-400 px-5 py-4">
                <p class="text-sm leading-6 text-content-muted">
                  {image.caption}
                </p>
              </div>
            {/if}
          </Card>
        {/if}
      </div>
    </div>
  </Container>
</section>
