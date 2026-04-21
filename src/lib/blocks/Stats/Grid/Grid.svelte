<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface StatsGridItem {
    value: string;
    label: string;
    description?: string;
  }

  export interface StatsGridProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: StatsGridItem[];
    columns?: 2 | 3 | 4;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    columns = 4,
    ...restProps
  }: StatsGridProps = $props();
</script>

<section class={cn("py-16 desk:py-24", className)} {...restProps}>
  <Container maxWidth="lg" padded>
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

      <div
        class={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2",
          {
            "desk:grid-cols-2": columns === 2,
            "desk:grid-cols-3": columns === 3,
            "desk:grid-cols-4": columns === 4,
          },
        )}
      >
        {#each items as item (item.label)}
          <div class="rounded-lg border border-base-400 bg-base-200 px-5 py-6">
            <p
              class="text-4xl font-semibold tracking-tight text-content desk:text-5xl"
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
