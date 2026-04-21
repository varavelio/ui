<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface LogoCloudMarqueeLogo {
    name: string;
    src?: string;
    alt?: string;
    href?: string;
  }

  export interface LogoCloudMarqueeProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    logos: LogoCloudMarqueeLogo[];
    speed?: "slow" | "normal" | "fast";
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    logos,
    speed = "normal",
    ...restProps
  }: LogoCloudMarqueeProps = $props();

  const duration = $derived(
    speed === "slow" ? "30s" : speed === "fast" ? "14s" : "20s",
  );
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

      <div class="overflow-hidden border-y border-base-400 py-5">
        <div
          class="varavel-logo-track flex w-max items-center gap-12"
          style={`--logo-duration: ${duration};`}
        >
          {#each logos as logo (`primary-${logo.name}`)}
            <div class="flex min-w-32 items-center justify-center">
              {#if logo.src}
                <img
                  alt={logo.alt ?? logo.name}
                  class="max-h-8 w-auto opacity-70 grayscale"
                  src={logo.src}
                >
              {:else}
                <span
                  class="text-sm font-medium uppercase tracking-[0.2em] text-content-muted"
                >
                  {logo.name}
                </span>
              {/if}
            </div>
          {/each}

          {#each logos as logo (`secondary-${logo.name}`)}
            <div
              aria-hidden="true"
              class="flex min-w-32 items-center justify-center"
            >
              {#if logo.src}
                <img
                  alt={logo.alt ?? logo.name}
                  class="max-h-8 w-auto opacity-70 grayscale"
                  src={logo.src}
                >
              {:else}
                <span
                  class="text-sm font-medium uppercase tracking-[0.2em] text-content-muted"
                >
                  {logo.name}
                </span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </Container>
</section>

<style>
  .varavel-logo-track {
    animation: logo-marquee var(--logo-duration) linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .varavel-logo-track {
      animation: none;
    }
  }

  @keyframes logo-marquee {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(calc(-50% - 1.5rem));
    }
  }
</style>
