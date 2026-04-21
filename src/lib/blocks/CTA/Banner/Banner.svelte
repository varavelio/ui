<script lang="ts">
  import type { Component } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
  import Button from "$lib/components/Button/Button.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface CTABannerAction {
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

  export interface CTABannerProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    actions: CTABannerAction[];
    caption?: string;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    actions,
    caption,
    ...restProps
  }: CTABannerProps = $props();

  function resolveTarget(action: CTABannerAction) {
    return action.target ?? (action.external ? "_blank" : undefined);
  }

  function resolveRel(action: CTABannerAction) {
    if (action.rel) {
      return action.rel;
    }

    return resolveTarget(action) === "_blank"
      ? "noopener noreferrer"
      : undefined;
  }
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="md" padded>
    <div
      class="rounded-lg border border-base-400 bg-base-200 px-6 py-10 text-center desk:px-10 desk:py-12"
    >
      <div class="space-y-6">
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

        {#if caption}
          <p class="text-sm text-content-muted">{caption}</p>
        {/if}
      </div>
    </div>
  </Container>
</section>
