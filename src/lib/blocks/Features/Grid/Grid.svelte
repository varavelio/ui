<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface FeatureGridItem {
    title: string;
    description: string;
    icon?: import("svelte").Component;
    eyebrow?: string;
    badge?: string;
    href?: string;
    linkLabel?: string;
  }

  export interface FeaturesGridProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: FeatureGridItem[];
    columns?: 2 | 3 | 4;
    item?: Snippet<[FeatureGridItem]>;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    columns = 3,
    item,
    ...restProps
  }: FeaturesGridProps = $props();
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

      <div
        class={cn(
          "grid grid-cols-1 gap-5 desk:gap-6",
          {
            "desk:grid-cols-2": columns === 2,
            "desk:grid-cols-3": columns === 3,
            "desk:grid-cols-4": columns === 4,
          },
        )}
      >
        {#each items as feature (feature.title)}
          {#if item}
            {@render item(feature)}
          {:else}
            <Card class="flex h-full flex-col gap-5 p-6">
              <div class="flex items-start justify-between gap-4">
                {#if feature.icon}
                  {@const Icon = feature.icon}
                  <div
                    class="flex size-11 shrink-0 items-center justify-center rounded-md border border-base-400 bg-base-300"
                  >
                    <Icon class="size-5 text-content" />
                  </div>
                {/if}

                {#if feature.badge}
                  <span
                    class="rounded-full border border-base-400 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-content-muted"
                  >
                    {feature.badge}
                  </span>
                {/if}
              </div>

              <div class="space-y-2">
                {#if feature.eyebrow}
                  <p
                    class="text-xs font-medium uppercase tracking-[0.2em] text-content-muted"
                  >
                    {feature.eyebrow}
                  </p>
                {/if}

                <h3 class="text-xl font-medium tracking-tight text-content">
                  {feature.title}
                </h3>

                <p class="text-sm leading-6 text-content-muted desk:text-base">
                  {feature.description}
                </p>
              </div>

              {#if feature.href}
                <Link
                  class="mt-auto text-sm no-underline hover:underline"
                  href={feature.href}
                >
                  {feature.linkLabel ?? "Learn more"}
                </Link>
              {/if}
            </Card>
          {/if}
        {/each}
      </div>
    </div>
  </Container>
</section>
