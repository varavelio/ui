<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Avatar from "$lib/components/Avatar/Avatar.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface TestimonialsMarqueeItem {
    quote: string;
    name: string;
    role: string;
    company?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    href?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
  }

  export interface TestimonialsMarqueeProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    items: TestimonialsMarqueeItem[];
    speed?: "slow" | "normal" | "fast";
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    items,
    speed = "normal",
    ...restProps
  }: TestimonialsMarqueeProps = $props();

  const duration = $derived(
    speed === "slow" ? "34s" : speed === "fast" ? "18s" : "26s",
  );
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

      <div class="overflow-hidden border-y border-base-400 py-4">
        <div
          class="varavel-testimonial-track flex w-max gap-5"
          style={`--testimonial-duration: ${duration};`}
        >
          {#each items as item (`primary-${item.name}-${item.quote}`)}
            <Card class="w-[320px] shrink-0 space-y-4 p-5">
              <blockquote class="text-sm leading-6 text-content">
                “{item.quote}
                ”
              </blockquote>
              <div
                class="flex items-center gap-3 border-t border-base-400 pt-4"
              >
                <Avatar
                  alt={item.avatarAlt ?? item.name}
                  fallback={item.name}
                  src={item.avatarSrc}
                />
                <div>
                  <p class="text-sm font-medium text-content">{item.name}</p>
                  <p class="text-sm text-content-muted">
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </Card>
          {/each}

          {#each items as item (`secondary-${item.name}-${item.quote}`)}
            <Card aria-hidden="true" class="w-[320px] shrink-0 space-y-4 p-5">
              <blockquote class="text-sm leading-6 text-content">
                “{item.quote}
                ”
              </blockquote>
              <div
                class="flex items-center gap-3 border-t border-base-400 pt-4"
              >
                <Avatar
                  alt={item.avatarAlt ?? item.name}
                  fallback={item.name}
                  src={item.avatarSrc}
                />
                <div>
                  <p class="text-sm font-medium text-content">{item.name}</p>
                  <p class="text-sm text-content-muted">
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </Card>
          {/each}
        </div>
      </div>
    </div>
  </Container>
</section>

<style>
  .varavel-testimonial-track {
    animation: testimonial-marquee var(--testimonial-duration) linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .varavel-testimonial-track {
      animation: none;
    }
  }

  @keyframes testimonial-marquee {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(calc(-50% - 0.625rem));
    }
  }
</style>
