<script lang="ts">
  import SiGithub from "@icons-pack/svelte-simple-icons/icons/SiGithub";
  import { GitFork, Star, Tag } from "@lucide/svelte";
  import { onMount } from "svelte";
  import type { ClassValue, HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";
  import Badge from "../Badge/Badge.svelte";
  import Button from "../Button/Button.svelte";
  import {
    type GithubRepositoryInfo,
    getGithubRepositoryInfo,
  } from "./github.ts";

  interface Props {
    /**
     * Additional CSS classes to apply to the button.
     */
    class?: ClassValue;

    /**
     * GitHub repository owner.
     */
    user: string;

    /**
     * GitHub repository name.
     */
    repo: string;

    /**
     * Optional custom destination URL.
     */
    href?: string;

    /**
     * Accessible label override for the button.
     */
    label?: string;

    /**
     * Button size preset.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /**
     * Button border radius preset.
     * @default "md"
     */
    radius?: "sm" | "md" | "lg" | "full";

    /**
     * Button appearance variant.
     * @default "outline"
     */
    variant?: "solid" | "outline" | "ghost";

    /**
     * Semantic color representing the button's intent.
     * @default "neutral"
     */
    color?: "neutral" | "info" | "success" | "warning" | "error";

    /**
     * Number formatting style.
     * @default "compact"
     */
    format?: "compact" | "full";

    /**
     * If true, shows the stars badge.
     * @default true
     */
    showStars?: boolean;

    /**
     * If true, shows the forks badge.
     * @default true
     */
    showForks?: boolean;

    /**
     * If true, shows the latest tag badge.
     * @default true
     */
    showTag?: boolean;

    /**
     * The target of the generated link.
     * @default "_blank"
     */
    target?: HTMLAnchorAttributes["target"];

    /**
     * The relationship attribute of the generated link.
     */
    rel?: HTMLAnchorAttributes["rel"];
  }

  let {
    class: className,
    user,
    repo,
    href,
    label,
    size = "md",
    radius = "md",
    variant = "outline",
    color = "neutral",
    format = "compact",
    showStars = true,
    showForks = true,
    showTag = true,
    target = "_blank",
    rel,
  }: Props = $props();

  let info = $state<GithubRepositoryInfo | null>(null);
  let loading = $state(true);

  let resolvedHref = $derived(
    href ?? `https://github.com/${user.trim()}/${repo.trim()}`,
  );
  let resolvedStars = $derived(
    info ? formatCount(info.stars, format) : loading ? undefined : "--",
  );
  let resolvedForks = $derived(
    info ? formatCount(info.forks, format) : loading ? undefined : "--",
  );
  let resolvedTag = $derived(info?.tag);
  let shouldShowTagBadge = $derived(showTag && (loading || !!resolvedTag));
  let shouldShowMeta = $derived(showStars || showForks || shouldShowTagBadge);

  function formatCount(count: number, nextFormat: "compact" | "full") {
    const formatter = new Intl.NumberFormat("en", {
      notation: nextFormat === "compact" ? "compact" : "standard",
      maximumFractionDigits: nextFormat === "compact" ? 1 : 0,
    });

    return formatter.format(count);
  }

  let resolvedLabel = $derived.by(() => {
    if (label) {
      return label;
    }

    const parts = [`Open ${user}/${repo} on GitHub`];

    if (info && showStars) {
      parts.push(`${info.stars} stars`);
    }

    if (info && showForks) {
      parts.push(`${info.forks} forks`);
    }

    if (info?.tag && showTag) {
      parts.push(`tag ${info.tag}`);
    }

    return parts.join(", ");
  });

  onMount(() => {
    let cancelled = false;

    void getGithubRepositoryInfo(user, repo).then((nextInfo) => {
      if (cancelled) {
        return;
      }

      info = nextInfo;
      loading = false;
    });

    return () => {
      cancelled = true;
    };
  });
</script>

<Button
  aria-label={resolvedLabel}
  alignContent="between"
  {color}
  href={resolvedHref}
  {loading}
  {radius}
  {rel}
  {size}
  {target}
  {variant}
  class={cn("w-full max-w-full", className)}
  wide
>
  <span class="inline-flex min-w-0 flex-1 items-center gap-2">
    <SiGithub aria-hidden="true" class="size-4 shrink-0" />
    <span class="truncate font-mono">{user}/{repo}</span>
  </span>

  {#if shouldShowMeta}
    <span
      class="inline-flex shrink-0 flex-wrap items-center justify-end gap-1.5 pl-2"
    >
      {#if showStars}
        <Badge
          class="min-w-11 gap-1 border-base-400 bg-base-100 text-content"
          size="sm"
        >
          <Star aria-hidden="true" class="size-3" />
          {#if resolvedStars}
            <span class="font-mono tabular-nums">{resolvedStars}</span>
          {:else}
            <span aria-hidden="true" class="invisible font-mono tabular-nums">
              000
            </span>
          {/if}
        </Badge>
      {/if}

      {#if showForks}
        <Badge
          class="min-w-11 gap-1 border-base-400 bg-base-100 text-content"
          size="sm"
        >
          <GitFork aria-hidden="true" class="size-3" />
          {#if resolvedForks}
            <span class="font-mono tabular-nums">{resolvedForks}</span>
          {:else}
            <span aria-hidden="true" class="invisible font-mono tabular-nums">
              000
            </span>
          {/if}
        </Badge>
      {/if}

      {#if shouldShowTagBadge}
        <Badge
          class="min-w-14 gap-1 border-base-400 bg-base-100 font-mono text-content"
          size="sm"
        >
          <Tag aria-hidden="true" class="size-3" />
          {#if resolvedTag}
            {resolvedTag}
          {:else}
            <span aria-hidden="true" class="invisible">v0.0.0</span>
          {/if}
        </Badge>
      {/if}
    </span>
  {/if}
</Button>
