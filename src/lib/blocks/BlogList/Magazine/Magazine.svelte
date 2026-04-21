<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface BlogListMagazinePost {
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

  export interface BlogListMagazineProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    posts: BlogListMagazinePost[];
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    posts,
    ...restProps
  }: BlogListMagazineProps = $props();

  const featuredPost = $derived(posts[0]);
  const secondaryPosts = $derived(posts.slice(1));
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

      {#if featuredPost}
        <div class="grid gap-6 desk:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Card class="overflow-hidden" padding="none">
            <div
              class="aspect-[16/10] overflow-hidden bg-base-300 desk:aspect-[16/11]"
            >
              {#if featuredPost.imageSrc}
                <img
                  alt={featuredPost.imageAlt ?? featuredPost.title}
                  class="size-full object-cover"
                  src={featuredPost.imageSrc}
                >
              {/if}
            </div>

            <div class="space-y-4 p-6 desk:p-8">
              <div
                class="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-content-muted"
              >
                {#if featuredPost.category}
                  <span>{featuredPost.category}</span>
                {/if}
                {#if featuredPost.date}
                  <span>{featuredPost.date}</span>
                {/if}
                {#if featuredPost.readTime}
                  <span>{featuredPost.readTime}</span>
                {/if}
              </div>

              <div class="space-y-3">
                <h3
                  class="text-2xl font-semibold tracking-tight text-content desk:text-3xl"
                >
                  {featuredPost.title}
                </h3>
                <p class="text-base leading-8 text-content-muted desk:text-lg">
                  {featuredPost.description}
                </p>
              </div>

              <div
                class="flex items-center justify-between gap-4 border-t border-base-400 pt-5"
              >
                {#if featuredPost.author}
                  <p class="text-sm text-content-muted">
                    {featuredPost.author}
                  </p>
                {/if}

                <Link
                  class="text-sm no-underline hover:underline"
                  href={featuredPost.href}
                >
                  Read feature
                </Link>
              </div>
            </div>
          </Card>

          <div class="space-y-5">
            {#each secondaryPosts as entry, index (`${entry.href}-${entry.title}-${index}`)}
              <Card class="space-y-4 p-5">
                <div
                  class="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-content-muted"
                >
                  {#if entry.category}
                    <span>{entry.category}</span>
                  {/if}
                  {#if entry.date}
                    <span>{entry.date}</span>
                  {/if}
                </div>

                <div class="space-y-2">
                  <h3 class="text-lg font-medium tracking-tight text-content">
                    {entry.title}
                  </h3>
                  <p class="text-sm leading-7 text-content-muted">
                    {entry.description}
                  </p>
                </div>

                <div
                  class="flex items-center justify-between gap-4 border-t border-base-400 pt-4"
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
              </Card>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </Container>
</section>
