<script lang="ts">
  import { ChevronRight } from "@lucide/svelte";
  import type { Component } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type BreadcrumbItem = {
    /**
     * Visible text label for the step.
     */
    label: string;

    /**
     * Icon component rendered before the label.
     */
    icon: Component;

    /**
     * Optional link destination. When provided, the step renders as an anchor.
     */
    href?: string;

    /**
     * Optional click handler. When provided (without href), the step renders as a button.
     */
    onClick?: () => void;

    /**
     * If true, prevents interaction with this step.
     * @default false
     */
    disabled?: boolean;
  };

  interface Props {
    /**
     * Additional CSS classes to apply to the breadcrumb root.
     */
    class?: ClassValue;

    /**
     * Screen reader label for the navigation landmark.
     * @default "Breadcrumb"
     */
    ariaLabel?: string;

    /**
     * Ordered breadcrumb steps.
     */
    items: BreadcrumbItem[];
  }

  let { class: className, ariaLabel = "Breadcrumb", items }: Props = $props();

  let scrollerRef = $state<HTMLDivElement | null>(null);

  $effect(() => {
    items;

    if (!scrollerRef) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      if (scrollerRef) {
        scrollerRef.scrollLeft = scrollerRef.scrollWidth;
      }
    });

    return () => cancelAnimationFrame(frame);
  });
</script>

<nav aria-label={ariaLabel} class={cn("w-full", className)}>
  <div
    bind:this={scrollerRef}
    class="max-w-full overflow-x-auto overflow-y-hidden pb-1"
  >
    <ol
      class="flex w-max min-w-full items-center justify-start gap-2 whitespace-nowrap"
    >
      {#each items as item, index (`${item.label}-${index}`)}
        {@const isActive = index === items.length - 1}
        {@const Icon = item.icon}
        {@const asAnchor = !!item.href && !item.disabled}
        {@const asButton = !asAnchor && !!item.onClick && !item.disabled}

        <li class="inline-flex items-center gap-2">
          {#if asAnchor}
            <a
              aria-current={isActive ? "page" : undefined}
              class={cn(
                "inline-flex items-center gap-1.5 rounded-sm text-sm font-medium no-underline transition-colors duration-150",
                "focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content",
                {
                  "text-content": isActive,
                  "text-content-muted hover:text-content": !isActive,
                },
              )}
              {...{ href: item.href }}
            >
              <Icon aria-hidden="true" class="size-4 shrink-0" />
              <span>{item.label}</span>
            </a>
          {:else if asButton}
            <button
              aria-current={isActive ? "page" : undefined}
              class={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-sm font-medium transition-colors duration-150",
                "focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content",
                {
                  "text-content": isActive,
                  "text-content-muted hover:text-content": !isActive,
                },
              )}
              onclick={item.onClick}
              type="button"
            >
              <Icon aria-hidden="true" class="size-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          {:else}
            <span
              aria-current={isActive ? "page" : undefined}
              aria-disabled={item.disabled ? "true" : undefined}
              class={cn("inline-flex items-center gap-1.5 text-sm font-medium", {
                "text-content": isActive,
                "text-content-muted": !isActive,
                "opacity-50": item.disabled,
                "cursor-not-allowed": item.disabled,
                "cursor-default": !item.disabled,
              })}
            >
              <Icon aria-hidden="true" class="size-4 shrink-0" />
              <span>{item.label}</span>
            </span>
          {/if}

          {#if index < items.length - 1}
            <ChevronRight
              aria-hidden="true"
              class="text-content-muted/70 size-4 shrink-0"
            />
          {/if}
        </li>
      {/each}
    </ol>
  </div>
</nav>
