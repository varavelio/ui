<script lang="ts">
  import type { Component } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface StatsWithContextAction {
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

  export interface StatsWithContextItem {
    value: string;
    label: string;
    description?: string;
  }

  export interface StatsWithContextProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: StatsWithContextItem[];
    actions?: StatsWithContextAction[];
    caption?: string;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    actions = [],
    caption,
    ...restProps
  }: StatsWithContextProps = $props();

  function resolveTarget(action: StatsWithContextAction) {
    return action.target ?? (action.external ? "_blank" : undefined);
  }

  function resolveRel(action: StatsWithContextAction) {
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
      class="grid gap-8 desk:grid-cols-[minmax(0,360px)_minmax(0,1fr)] desk:items-start desk:gap-12"
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

        {#if actions.length}
          <div class="flex flex-wrap gap-3">
            {#each actions as action (`${action.label}-${action.href ?? "button"}`)}
              <Button
                color={action.color ?? "neutral"}
                href={action.href}
                icon={action.icon}
                iconRight={action.iconRight}
                rel={resolveRel(action)}
                size={action.size ?? "md"}
                target={resolveTarget(action)}
                variant={action.variant ?? "solid"}
              >
                {action.label}
              </Button>
            {/each}
          </div>
        {/if}
        {#if caption}
          <p class="text-sm text-content-muted">{caption}</p>
        {/if}
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {#each items as item (item.label)}
          <div class="rounded-lg border border-base-400 bg-base-200 px-5 py-6">
            <p
              class="text-3xl font-semibold tracking-tight text-content desk:text-4xl"
            >
              {item.value}
            </p>
            <div class="mt-3 space-y-1">
              <p class="font-medium text-content">{item.label}</p>
              {#if item.description}
                <p class="text-sm leading-6 text-content-muted">
                  {item.description}
                </p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </Container>
</section>
