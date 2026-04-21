<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface BlogListGridPost {
    title: string;
    description: string;
    href: string;
    imageSrc?: string;
    imageAlt?: string;
    category?: string;
    date?: string;
    author?: string;
    readTime?: string;
  }

  export interface BlogListGridProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    posts: BlogListGridPost[];
    columns?: 2 | 3;
    post?: Snippet<[BlogListGridPost]>;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    posts,
    columns = 3,
    post,
    ...restProps
  }: BlogListGridProps = $props();
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
        {#each posts as entry, index (`${entry.href}-${entry.title}-${index}`)}
          {#if post}
            {@render post(entry)}
          {:else}
            <Card class="flex h-full flex-col overflow-hidden" padding="none">
              <div class="aspect-[16/10] overflow-hidden bg-base-300">
                {#if entry.imageSrc}
                  <img
                    alt={entry.imageAlt ?? entry.title}
                    class="size-full object-cover"
                    src={entry.imageSrc}
                  >
                {/if}
              </div>

              <div class="flex h-full flex-col gap-4 p-6">
                <div
                  class="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-content-muted"
                >
                  {#if entry.category}
                    <span>{entry.category}</span>
                  {/if}
                  {#if entry.date}
                    <span>{entry.date}</span>
                  {/if}
                  {#if entry.readTime}
                    <span>{entry.readTime}</span>
                  {/if}
                </div>

                <div class="space-y-3">
                  <h3 class="text-xl font-medium tracking-tight text-content">
                    {entry.title}
                  </h3>
                  <p
                    class="text-sm leading-7 text-content-muted desk:text-base"
                  >
                    {entry.description}
                  </p>
                </div>

                <div
                  class="mt-auto flex items-center justify-between gap-4 pt-2"
                >
                  {#if entry.author}
                    <p class="text-sm text-content-muted">{entry.author}</p>
                  {/if}

                  <Link
                    class="text-sm no-underline hover:underline"
                    href={entry.href}
                  >
                    Read article
                  </Link>
                </div>
              </div>
            </Card>
          {/if}
        {/each}
      </div>
    </div>
  </Container>
</section>
