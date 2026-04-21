<script lang="ts">
  import { Star } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Avatar from "$lib/components/Avatar/Avatar.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface TestimonialsGridItem {
    quote: string;
    name: string;
    role: string;
    company?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    href?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
  }

  export interface TestimonialsGridProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: TestimonialsGridItem[];
    columns?: 2 | 3;
    testimonial?: Snippet<[TestimonialsGridItem]>;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    columns = 3,
    testimonial,
    ...restProps
  }: TestimonialsGridProps = $props();
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
          },
        )}
      >
        {#each items as entry (`${entry.name}-${entry.quote}`)}
          {#if testimonial}
            {@render testimonial(entry)}
          {:else}
            <Card class="flex h-full flex-col gap-6 p-6">
              {#if entry.rating}
                <div class="flex gap-1">
                  {#each { length: entry.rating } as _, index (index)}
                    <Star class="size-4 fill-current text-content" />
                  {/each}
                </div>
              {/if}

              <blockquote class="text-base leading-7 text-content desk:text-lg">
                “{entry.quote}
                ”
              </blockquote>

              <div
                class="mt-auto flex items-center gap-4 border-t border-base-400 pt-4"
              >
                <Avatar
                  alt={entry.avatarAlt ?? entry.name}
                  fallback={entry.name}
                  size="lg"
                  src={entry.avatarSrc}
                />

                <div class="space-y-1">
                  <p class="font-medium text-content">{entry.name}</p>
                  <p class="text-sm text-content-muted">
                    {entry.role}
                    {entry.company ? `, ${entry.company}` : ""}
                  </p>

                  {#if entry.href}
                    <Link
                      class="text-sm no-underline hover:underline"
                      href={entry.href}
                    >
                      Read story
                    </Link>
                  {/if}
                </div>
              </div>
            </Card>
          {/if}
        {/each}
      </div>
    </div>
  </Container>
</section>
