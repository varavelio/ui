<script lang="ts">
  import { Download, ExternalLink } from "@lucide/svelte";
  import type { Component } from "svelte";
  import type { ClassValue, HTMLAnchorAttributes } from "svelte/elements";
  import { Link, Menu } from "../../components/index.js";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the logo surface.
     */
    class?: ClassValue;

    /**
     * Optional link destination. If provided, the logo renders as an anchor.
     */
    href?: string;

    /**
     * Where to display the linked URL.
     */
    target?: HTMLAnchorAttributes["target"];

    /**
     * The relationship of the linked URL as space-separated link types.
     */
    rel?: HTMLAnchorAttributes["rel"];

    /**
     * Accessible label for the logo trigger.
     * @default "Varavel"
     */
    ariaLabel?: string;

    /**
     * Whether hover should morph the mark from the V pose into the A pose.
     * @default true
     */
    animate?: boolean;

    /**
     * Whether the context menu should be enabled.
     * @default true
     */
    contextMenu?: boolean;
  }

  let {
    class: className,
    href,
    target,
    rel,
    ariaLabel = "Varavel",
    animate = true,
    contextMenu = true,
  }: Props = $props();

  let hovered = $state(false);

  let markState: "v" | "a" = $derived(animate && hovered ? "a" : "v");
  let resolvedTarget = $derived(href ? target : undefined);
  let resolvedRel = $derived.by(() => {
    if (!href) {
      return undefined;
    }

    if (resolvedTarget !== "_blank" || rel) {
      return rel;
    }

    return "noopener noreferrer";
  });

  const brandRepositoryUrl = "https://github.com/varavelio/brand";
  const uiRepositoryUrl = "https://github.com/varavelio/ui";

  const contextItems = [
    {
      label: "Download logo",
      icon: brandIcon,
      onSelect: () => openExternal(brandRepositoryUrl),
    },
    {
      label: "View UI library",
      icon: libraryIcon,
      onSelect: () => openExternal(uiRepositoryUrl),
    },
  ];

  function openExternal(url: string) {
    if (typeof window === "undefined") {
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }
</script>

{#snippet icon(Icon: Component)}
  <Icon class="size-4" />
{/snippet}

{#snippet brandIcon()}
  {@render icon(Download)}
{/snippet}

{#snippet libraryIcon()}
  {@render icon(ExternalLink)}
{/snippet}

{#snippet brandMark(state: "v" | "a")}
  <svg
    aria-hidden="true"
    viewBox="0 0 800 800"
    class="size-full shrink-0 text-black transition-colors duration-150 dark:text-white"
  >
    <rect
      x="0"
      y={state === "a" ? 200 : 0}
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
      style="transition: y 180ms cubic-bezier(0.4, 0, 0.2, 1);"
    />
    <rect
      x="300"
      y={state === "a" ? 0 : 200}
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
      style="transition: y 180ms cubic-bezier(0.4, 0, 0.2, 1);"
    />
    <rect
      x="600"
      y={state === "a" ? 200 : 0}
      width="200"
      height="600"
      rx="16"
      fill="currentColor"
      style="transition: y 180ms cubic-bezier(0.4, 0, 0.2, 1);"
    />
  </svg>
{/snippet}

{#snippet surface()}
  {#if href}
    <Link
      {href}
      target={resolvedTarget}
      rel={resolvedRel}
      aria-label={ariaLabel}
      class={cn(
        "inline-flex size-10 items-center justify-center gap-0 rounded-lg align-middle decoration-transparent no-underline transition-colors duration-150 hover:decoration-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:ring-0",
        className,
      )}
      onmouseenter={() => (hovered = true)}
      onmouseleave={() => (hovered = false)}
    >
      {@render brandMark(markState)}
    </Link>
  {:else}
    <span
      aria-label={ariaLabel}
      role="img"
      class={cn("inline-flex size-10 items-center justify-center align-middle", className)}
      onmouseenter={() => (hovered = true)}
      onmouseleave={() => (hovered = false)}
    >
      {@render brandMark(markState)}
    </span>
  {/if}
{/snippet}

{#if contextMenu}
  <Menu mode="context" items={contextItems}>
    {#snippet trigger()}
      {@render surface()}
    {/snippet}
  </Menu>
{:else}
  {@render surface()}
{/if}
