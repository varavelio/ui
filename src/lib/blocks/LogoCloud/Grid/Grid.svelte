<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "$lib/components/Container/Container.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface LogoCloudGridLogo {
    name: string;
    src?: string;
    alt?: string;
    href?: string;
  }

  export interface LogoCloudGridProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    logos: LogoCloudGridLogo[];
    columns?: 2 | 3 | 4 | 5 | 6;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    logos,
    columns = 5,
    ...restProps
  }: LogoCloudGridProps = $props();
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
          "grid grid-cols-2 overflow-hidden rounded-lg border border-base-400",
          {
            "desk:grid-cols-2": columns === 2,
            "desk:grid-cols-3": columns === 3,
            "desk:grid-cols-4": columns === 4,
            "desk:grid-cols-5": columns === 5,
            "desk:grid-cols-6": columns === 6,
          },
        )}
      >
        {#each logos as logo (logo.name)}
          <div
            class="flex min-h-24 items-center justify-center border-r border-b border-base-400 bg-base-200 px-5 py-6 last:border-r-0 [&:nth-child(2n)]:border-r-0 desk:[&:nth-child(2n)]:border-r desk:[&:nth-child(3n)]:border-r desk:[&:nth-child(4n)]:border-r desk:[&:nth-child(5n)]:border-r desk:[&:nth-child(6n)]:border-r"
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
  </Container>
</section>
