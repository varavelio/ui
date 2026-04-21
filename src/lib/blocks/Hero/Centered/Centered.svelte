<script lang="ts">
  import type { Component } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface HeroAnnouncement {
    label: string;
    href: string;
  }

  export interface HeroCenteredAction {
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

  export interface HeroCenteredStat {
    value: string;
    label: string;
    description?: string;
  }

  export interface HeroCenteredProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    announcement?: HeroAnnouncement;
    title: string;
    description?: string;
    actions?: HeroCenteredAction[];
    stats?: HeroCenteredStat[];
    caption?: string;
  }

  let {
    class: className,
    eyebrow,
    announcement,
    title,
    description,
    actions = [],
    stats = [],
    caption,
    ...restProps
  }: HeroCenteredProps = $props();

  function resolveTarget(action: HeroCenteredAction) {
    return action.target ?? (action.external ? "_blank" : undefined);
  }

  function resolveRel(action: HeroCenteredAction) {
    if (action.rel) {
      return action.rel;
    }

    return resolveTarget(action) === "_blank"
      ? "noopener noreferrer"
      : undefined;
  }
</script>

<section class={cn("py-20 desk:py-28", className)} {...restProps}>
  <Container maxWidth="md" padded>
    <div class="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
      {#if announcement}
        <Link
          class="rounded-full border border-base-400 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] no-underline hover:underline"
          href={announcement.href}
        >
          {announcement.label}
        </Link>
      {/if}

      {#if eyebrow}
        <p
          class="text-xs font-medium uppercase tracking-[0.24em] text-content-muted"
        >
          {eyebrow}
        </p>
      {/if}

      <h1
        class="max-w-4xl text-4xl font-semibold tracking-tighter text-content desk:text-6xl"
      >
        {title}
      </h1>

      {#if description}
        <p class="max-w-3xl text-lg leading-8 text-content-muted desk:text-xl">
          {description}
        </p>
      {/if}

      {#if actions.length}
        <div class="flex flex-wrap justify-center gap-3">
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

      {#if stats.length}
        <div
          class="mt-4 grid w-full grid-cols-1 gap-4 border-t border-base-400 pt-8 sm:grid-cols-3"
        >
          {#each stats as stat (stat.label)}
            <div
              class="space-y-2 rounded-lg border border-base-400 bg-base-200 px-5 py-4"
            >
              <p class="text-3xl font-semibold tracking-tight text-content">
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

      {#if caption}
        <p class="text-sm text-content-muted">{caption}</p>
      {/if}
    </div>
  </Container>
</section>
