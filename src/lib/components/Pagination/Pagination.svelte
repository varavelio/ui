<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: Used as a compound component namespace in Svelte markup.
  import { Pagination as BitsPagination } from "bits-ui";
  import type { ClassValue } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props {
    /**
     * Additional CSS classes to apply to the pagination wrapper.
     */
    class?: ClassValue;

    /**
     * Total number of items to paginate.
     */
    count: number;

    /**
     * The selected page.
     * @default 1
     */
    page?: number;

    /**
     * Number of items per page.
     * @default 10
     */
    perPage?: number;

    /**
     * Number of visible page buttons on each side of the active page.
     * @default 1
     */
    siblingCount?: number;

    /**
     * Whether keyboard navigation should loop at the ends.
     * @default false
     */
    loop?: boolean;

    /**
     * If true, shows the visible item range below the controls.
     * @default false
     */
    showSummary?: boolean;

    /**
     * If true, hides pagination when there is only one page.
     * @default true
     */
    hideIfSinglePage?: boolean;

    /**
     * Accessible label for the navigation landmark.
     * @default "Pagination"
     */
    ariaLabel?: string;

    /**
     * Accessible label for the previous button.
     * @default "Previous"
     */
    prevLabel?: string;

    /**
     * Accessible label for the next button.
     * @default "Next"
     */
    nextLabel?: string;

    /**
     * Callback fired when the selected page changes.
     */
    onPageChange?: (page: number) => void;
  }

  let {
    class: className,
    count,
    page = $bindable(1),
    perPage = 10,
    siblingCount = 1,
    loop = false,
    showSummary = false,
    hideIfSinglePage = true,
    ariaLabel = "Pagination",
    prevLabel = "Previous",
    nextLabel = "Next",
    onPageChange,
  }: Props = $props();

  let safeCount = $derived(Math.max(0, count));
  let safePerPage = $derived(Math.max(1, perPage));
  let totalPages = $derived(Math.max(1, Math.ceil(safeCount / safePerPage)));
  let shouldHide = $derived(hideIfSinglePage && totalPages <= 1);
</script>

{#if !shouldHide}
  <nav aria-label={ariaLabel} class={cn("w-full", className)}>
    <BitsPagination.Root
      bind:page
      count={Math.max(1, safeCount)}
      {loop}
      {onPageChange}
      perPage={safePerPage}
      {siblingCount}
    >
      {#snippet children({ pages, range })}
        <div class="flex flex-col gap-3">
          <div class="flex flex-wrap items-center justify-center gap-1">
            <BitsPagination.PrevButton
              aria-label={prevLabel}
              class="inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium text-content-muted transition-colors duration-150 hover:bg-base-300 hover:text-content focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content disabled:cursor-not-allowed disabled:opacity-50"
            >
              {prevLabel}
            </BitsPagination.PrevButton>

            <div class="flex items-center gap-1">
              {#each pages as item (item.key)}
                {#if item.type === "ellipsis"}
                  <span
                    aria-hidden="true"
                    class="inline-flex h-10 min-w-10 items-center justify-center px-2 text-sm text-content-muted"
                  >
                    ...
                  </span>
                {:else}
                  <BitsPagination.Page
                    page={item}
                    class="inline-flex h-10 min-w-10 items-center justify-center rounded-md px-3 text-sm font-medium text-content-muted transition-colors duration-150 hover:bg-base-300 hover:text-content focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content disabled:cursor-not-allowed disabled:opacity-50 data-selected:bg-base-300 data-selected:text-content"
                  >
                    {item.value}
                  </BitsPagination.Page>
                {/if}
              {/each}
            </div>

            <BitsPagination.NextButton
              aria-label={nextLabel}
              class="inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium text-content-muted transition-colors duration-150 hover:bg-base-300 hover:text-content focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-content disabled:cursor-not-allowed disabled:opacity-50"
            >
              {nextLabel}
            </BitsPagination.NextButton>
          </div>

          {#if showSummary}
            <p class="text-center text-sm text-content-muted">
              Showing {range.start}
              -{range.end} of {safeCount}
            </p>
          {/if}
        </div>
      {/snippet}
    </BitsPagination.Root>
  </nav>
{/if}
