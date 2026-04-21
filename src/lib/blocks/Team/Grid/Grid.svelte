<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Avatar from "$lib/components/Avatar/Avatar.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Container from "$lib/components/Container/Container.svelte";
  import Link from "$lib/components/Link/Link.svelte";
  import { cn } from "$lib/helpers/cn.js";

  export interface TeamLink {
    label: string;
    href: string;
    target?: import("svelte/elements").HTMLAnchorAttributes["target"];
    rel?: import("svelte/elements").HTMLAnchorAttributes["rel"];
    external?: boolean;
  }

  export interface TeamMember {
    name: string;
    role: string;
    bio?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    location?: string;
    profileHref?: string;
    links?: TeamLink[];
  }

  export interface TeamGridProps
    extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    eyebrow?: string;
    title?: string;
    description?: string;
    members: TeamMember[];
    columns?: 2 | 3 | 4;
    member?: Snippet<[TeamMember]>;
  }

  let {
    class: className,
    eyebrow,
    title,
    description,
    members,
    columns = 3,
    member,
    ...restProps
  }: TeamGridProps = $props();
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
            "desk:grid-cols-4": columns === 4,
          },
        )}
      >
        {#each members as entry (entry.name)}
          {#if member}
            {@render member(entry)}
          {:else}
            <Card class="flex h-full flex-col gap-5 p-6">
              <div class="flex items-center gap-4">
                <Avatar
                  alt={entry.avatarAlt ?? entry.name}
                  fallback={entry.name}
                  size="xl"
                  src={entry.avatarSrc}
                />
                <div>
                  <h3 class="text-lg font-medium tracking-tight text-content">
                    {entry.name}
                  </h3>
                  <p class="text-sm text-content-muted">{entry.role}</p>
                </div>
              </div>

              {#if entry.bio}
                <p class="text-sm leading-7 text-content-muted desk:text-base">
                  {entry.bio}
                </p>
              {/if}

              <div class="mt-auto space-y-3 border-t border-base-400 pt-4">
                {#if entry.location}
                  <p class="text-sm text-content-muted">{entry.location}</p>
                {/if}

                {#if entry.profileHref}
                  <Link
                    class="text-sm no-underline hover:underline"
                    href={entry.profileHref}
                  >
                    View profile
                  </Link>
                {/if}

                {#if entry.links?.length}
                  <div class="flex flex-wrap gap-3 text-sm">
                    {#each entry.links as link (link.label)}
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
            </Card>
          {/if}
        {/each}
      </div>
    </div>
  </Container>
</section>
