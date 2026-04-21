<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import Separator from "$lib/components/Separator/Separator.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface FooterLink {
    label: string;
    href: string;
    target?: import("svelte/elements").HTMLAnchorAttributes["target"];
    rel?: import("svelte/elements").HTMLAnchorAttributes["rel"];
    external?: boolean;
  }

  export interface FooterBrand {
    name: string;
    href?: string;
    tagline?: string;
    logoSrc?: string;
    logoAlt?: string;
  }

  export interface FooterColumn {
    title: string;
    links: FooterLink[];
  }

  export interface FooterColumnsProps extends HTMLAttributes<HTMLElement> {
    brand: FooterBrand;
    columns: FooterColumn[];
    socialLinks?: FooterLink[];
    legalLinks?: FooterLink[];
    copyright?: string;
  }

  let {
    class: className,
    brand,
    columns,
    socialLinks = [],
    legalLinks = [],
    copyright,
    ...restProps
  }: FooterColumnsProps = $props();
</script>

<footer
  class={cn("border-t border-base-400 py-12 desk:py-16", className)}
  {...restProps}
>
  <Container maxWidth="lg" padded>
    <div class="space-y-10">
      <div
        class="grid gap-10 desk:grid-cols-[minmax(0,320px)_minmax(0,1fr)] desk:gap-16"
      >
        <div class="space-y-5">
          {#if brand.logoSrc}
            <img
              alt={brand.logoAlt ?? brand.name}
              class="h-10 w-auto"
              src={brand.logoSrc}
            >
          {/if}

          {#if brand.href}
            <Link
              class="text-lg font-semibold no-underline hover:underline"
              href={brand.href}
            >
              {brand.name}
            </Link>
          {:else}
            <p class="text-lg font-semibold tracking-tight text-content">
              {brand.name}
            </p>
          {/if}

          {#if brand.tagline}
            <p
              class="max-w-xs text-sm leading-6 text-content-muted desk:text-base"
            >
              {brand.tagline}
            </p>
          {/if}
        </div>

        <div
          class={cn(
            "grid grid-cols-1 gap-8 sm:grid-cols-2",
            {
              "desk:grid-cols-1": columns.length === 1,
              "desk:grid-cols-2": columns.length === 2,
              "desk:grid-cols-3": columns.length === 3,
              "desk:grid-cols-4": columns.length >= 4,
            },
          )}
        >
          {#each columns as column (column.title)}
            <div class="space-y-4">
              <h3
                class="text-sm font-medium uppercase tracking-[0.18em] text-content-muted"
              >
                {column.title}
              </h3>

              <nav aria-label={column.title} class="flex flex-col gap-3">
                {#each column.links as link (`${column.title}-${link.label}`)}
                  <Link
                    class="text-sm no-underline hover:underline"
                    href={link.href}
                    rel={link.rel}
                    target={link.target}
                  >
                    {link.label}
                  </Link>
                {/each}
              </nav>
            </div>
          {/each}
        </div>
      </div>

      <Separator />

      <div
        class="flex flex-col gap-5 desk:flex-row desk:items-center desk:justify-between"
      >
        <div class="space-y-3">
          {#if copyright}
            <p class="text-sm text-content-muted">{copyright}</p>
          {/if}

          {#if legalLinks.length}
            <div class="flex flex-wrap gap-4 text-sm text-content-muted">
              {#each legalLinks as link (link.label)}
                <Link
                  class="text-sm text-content-muted no-underline hover:underline"
                  href={link.href}
                  rel={link.rel}
                  target={link.target}
                >
                  {link.label}
                </Link>
              {/each}
            </div>
          {/if}
        </div>

        {#if socialLinks.length}
          <div class="flex flex-wrap gap-4 text-sm">
            {#each socialLinks as link (link.label)}
              <Link
                class="text-sm no-underline hover:underline"
                href={link.href}
                rel={link.rel}
                target={link.target}
              >
                {link.label}
              </Link>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </Container>
</footer>
