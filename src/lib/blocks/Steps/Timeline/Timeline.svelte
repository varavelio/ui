<script lang="ts">
  import type { Component } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface StepsTimelineItem {
    step?: string;
    title: string;
    description: string;
    icon?: Component;
    href?: string;
    linkLabel?: string;
  }

  export interface StepsTimelineProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: StepsTimelineItem[];
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    ...restProps
  }: StepsTimelineProps = $props();
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

      <div class="space-y-0">
        {#each items as item, index (`${item.title}-${index}`)}
          <div
            class="grid gap-4 border-l border-base-400 pl-6 first:pt-0 last:border-l-transparent last:pb-0 pb-8 desk:grid-cols-[96px_minmax(0,1fr)] desk:gap-8"
          >
            <div class="relative">
              <div
                class="absolute -left-[2.05rem] top-1 flex size-8 items-center justify-center rounded-full border border-base-400 bg-base-100 text-xs font-medium text-content"
              >
                {item.step ?? `${index + 1}`.padStart(2, "0")}
              </div>

              {#if item.icon}
                {@const Icon = item.icon}
                <div class="hidden desk:flex h-full items-start justify-center">
                  <div
                    class="flex size-12 items-center justify-center rounded-md border border-base-400 bg-base-200"
                  >
                    <Icon class="size-5 text-content" />
                  </div>
                </div>
              {/if}
            </div>

            <div
              class="space-y-3 rounded-lg border border-base-400 bg-base-200 p-5"
            >
              <h3 class="text-xl font-medium tracking-tight text-content">
                {item.title}
              </h3>
              <p class="text-sm leading-7 text-content-muted desk:text-base">
                {item.description}
              </p>

              {#if item.href}
                <Link
                  class="text-sm no-underline hover:underline"
                  href={item.href}
                >
                  {item.linkLabel ?? "Learn more"}
                </Link>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </Container>
</section>
