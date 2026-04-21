<script lang="ts">
  import { ChevronLeft, ChevronRight, Star } from "@lucide/svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Avatar from "$lib/components/Avatar/Avatar.svelte";
  import Button from "$lib/components/Button/Button.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface TestimonialsCarouselItem {
    quote: string;
    name: string;
    role: string;
    company?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    href?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
  }

  export interface TestimonialsCarouselProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: TestimonialsCarouselItem[];
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    ...restProps
  }: TestimonialsCarouselProps = $props();

  let activeIndex = $state(0);

  const activeItem = $derived(items[activeIndex]);

  function previous() {
    if (!items.length) {
      return;
    }

    activeIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  }

  function next() {
    if (!items.length) {
      return;
    }

    activeIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  }
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

      {#if activeItem}
        <Card class="space-y-8 p-6 desk:p-10">
          <div class="flex items-center justify-between gap-4">
            <div class="text-sm text-content-muted">
              {activeIndex + 1} / {items.length}
            </div>

            <div class="flex gap-2">
              <Button
                aria-label="Previous testimonial"
                onclick={previous}
                square
                size="sm"
                variant="outline"
              >
                <ChevronLeft class="size-4" />
              </Button>
              <Button
                aria-label="Next testimonial"
                onclick={next}
                square
                size="sm"
                variant="outline"
              >
                <ChevronRight class="size-4" />
              </Button>
            </div>
          </div>

          {#if activeItem.rating}
            <div class="flex gap-1">
              {#each { length: activeItem.rating } as _, index (index)}
                <Star class="size-4 fill-current text-content" />
              {/each}
            </div>
          {/if}

          <blockquote
            class="max-w-4xl text-2xl font-medium leading-10 tracking-tight text-content desk:text-4xl desk:leading-[1.2]"
          >
            “{activeItem.quote}
            ”
          </blockquote>

          <div
            class="flex flex-col gap-6 border-t border-base-400 pt-6 desk:flex-row desk:items-center desk:justify-between"
          >
            <div class="flex items-center gap-4">
              <Avatar
                alt={activeItem.avatarAlt ?? activeItem.name}
                fallback={activeItem.name}
                size="xl"
                src={activeItem.avatarSrc}
              />

              <div>
                <p class="font-medium text-content">{activeItem.name}</p>
                <p class="text-sm text-content-muted">
                  {activeItem.role}
                  {activeItem.company ? `, ${activeItem.company}` : ""}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              {#each items as item, index (`${item.name}-${index}`)}
                <button
                  aria-label={`Show testimonial ${index + 1}`}
                  class={cn(
                    "flex items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors duration-150",
                    {
                      "border-content bg-base-100": index === activeIndex,
                      "border-base-400 bg-base-200 hover:bg-base-100": index !== activeIndex,
                    },
                  )}
                  onclick={() => {
                    activeIndex = index;
                  }}
                  type="button"
                >
                  <Avatar
                    alt={item.avatarAlt ?? item.name}
                    fallback={item.name}
                    size="sm"
                    src={item.avatarSrc}
                  />
                  <span class="text-sm font-medium text-content">
                    {item.name}
                  </span>
                </button>
              {/each}
            </div>
          </div>
        </Card>
      {/if}
    </div>
  </Container>
</section>
