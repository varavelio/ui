<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, SvelteHTMLElements } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  type Props = Omit<SvelteHTMLElements["table"], "children" | "class"> & {
    /** Additional CSS classes for the table surface wrapper. */
    class?: ClassValue;
    /** Semantic table content. */
    children?: Snippet;
    /** Surface treatment for standalone or embedded tables. */
    variant?: "default" | "ghost";
    /** Density preset for header and cell spacing. */
    size?: "sm" | "md" | "lg";
    /** Whether body rows alternate surface tones. */
    striped?: boolean;
    /** Whether header cells stay pinned while scrolling. */
    stickyHeader?: boolean;
    /** Whether footer cells stay pinned while scrolling. */
    stickyFooter?: boolean;
    /** Whether the first column stays pinned during horizontal scrolling. */
    stickyColumn?: boolean;
    /** Whether the last column stays pinned during horizontal scrolling. */
    stickyActions?: boolean;
  };

  let {
    class: className,
    children,
    variant = "default",
    size = "md",
    striped = false,
    stickyHeader = false,
    stickyFooter = false,
    stickyColumn = false,
    stickyActions = false,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
    "max-w-full overflow-auto bg-base-200",
    {
      "rounded-lg border border-base-400 shadow-sm": variant === "default",
    },
    className,
  )}
>
  <table
    {...restProps}
    class={cn(
      "min-w-full border-separate border-spacing-0 text-left text-content align-middle",
      "[&_tbody_tr:last-child_td]:border-b-0",
      "[&_tfoot_tr:last-child_td]:border-b-0",
      "[&_tbody_td]:transition-colors [&_tbody_td]:duration-150",
      "[&_tbody_tr:hover_td]:bg-base-300/50",
      {
        "[&_th]:px-3 [&_th]:py-2 [&_th]:text-xs [&_td]:px-3 [&_td]:py-2 [&_td]:text-xs": size === "sm",
        "[&_th]:px-4 [&_th]:py-3 [&_th]:text-sm [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm": size === "md",
        "[&_th]:px-5 [&_th]:py-4 [&_th]:text-sm [&_td]:px-5 [&_td]:py-4 [&_td]:text-sm": size === "lg",
        "[&_tbody_tr:nth-child(odd)]:bg-base-100": striped,
        "[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-20 [&_thead_th]:bg-base-200": stickyHeader,
        "[&_tfoot_td]:sticky [&_tfoot_td]:bottom-0 [&_tfoot_td]:z-20 [&_tfoot_td]:bg-base-200": stickyFooter,
        "[&_thead_th:first-child]:sticky [&_thead_th:first-child]:left-0 [&_thead_th:first-child]:z-30 [&_thead_th:first-child]:bg-base-200 [&_tbody_td:first-child]:sticky [&_tbody_td:first-child]:left-0 [&_tbody_td:first-child]:z-10 [&_tfoot_td:first-child]:sticky [&_tfoot_td:first-child]:left-0 [&_tfoot_td:first-child]:z-30 [&_tfoot_td:first-child]:bg-base-200": stickyColumn,
        "[&_tbody_td:first-child]:bg-base-200": stickyColumn && !striped,
        "[&_tbody_tr:nth-child(odd)_td:first-child]:bg-base-100 [&_tbody_tr:nth-child(even)_td:first-child]:bg-base-200": stickyColumn && striped,
        "[&_tbody_tr:hover_td:first-child]:bg-[color-mix(in_oklab,var(--color-base-300)_50%,var(--color-base-200)_50%)]": stickyColumn,
        "[&_tbody_tr:nth-child(odd):hover_td:first-child]:bg-[color-mix(in_oklab,var(--color-base-300)_50%,var(--color-base-100)_50%)]": stickyColumn && striped,
        "[&_thead_th:last-child]:sticky [&_thead_th:last-child]:right-0 [&_thead_th:last-child]:z-30 [&_thead_th:last-child]:bg-base-200 [&_tbody_td:last-child]:sticky [&_tbody_td:last-child]:right-0 [&_tbody_td:last-child]:z-10 [&_tfoot_td:last-child]:sticky [&_tfoot_td:last-child]:right-0 [&_tfoot_td:last-child]:z-30 [&_tfoot_td:last-child]:bg-base-200": stickyActions,
        "[&_tbody_td:last-child]:bg-base-200": stickyActions && !striped,
        "[&_tbody_tr:nth-child(odd)_td:last-child]:bg-base-100 [&_tbody_tr:nth-child(even)_td:last-child]:bg-base-200": stickyActions && striped,
        "[&_tbody_tr:hover_td:last-child]:bg-[color-mix(in_oklab,var(--color-base-300)_50%,var(--color-base-200)_50%)]": stickyActions,
        "[&_tbody_tr:nth-child(odd):hover_td:last-child]:bg-[color-mix(in_oklab,var(--color-base-300)_50%,var(--color-base-100)_50%)]": stickyActions && striped,
      },
    )}
  >
    {@render children?.()}
  </table>
</div>
