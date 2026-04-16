<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Inner content of the masonry layout.
     */
    children?: Snippet;

    /**
     * Columns on mobile viewport.
     * @default "1"
     */
    cols?:
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "10"
      | "11"
      | "12";

    /**
     * Columns on desktop viewport (1024px+).
     * @default "3"
     */
    deskCols?:
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "10"
      | "11"
      | "12";

    /**
     * Spacing scale between items.
     * @default "4"
     */
    gap?: "0" | "2" | "4" | "6" | "8";
  }

  let {
    children,
    cols = "1",
    deskCols = "3",
    gap = "4",
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
		"w-full",

		// Mobile columns
		cols === "1" && "columns-1",
		cols === "2" && "columns-2",
		cols === "3" && "columns-3",
		cols === "4" && "columns-4",
		cols === "5" && "columns-5",
		cols === "6" && "columns-6",
		cols === "7" && "columns-7",
		cols === "8" && "columns-8",
		cols === "9" && "columns-9",
		cols === "10" && "columns-10",
		cols === "11" && "columns-11",
		cols === "12" && "columns-12",

		// Desktop columns
		deskCols === "1" && "desk:columns-1",
		deskCols === "2" && "desk:columns-2",
		deskCols === "3" && "desk:columns-3",
		deskCols === "4" && "desk:columns-4",
		deskCols === "5" && "desk:columns-5",
		deskCols === "6" && "desk:columns-6",
		deskCols === "7" && "desk:columns-7",
		deskCols === "8" && "desk:columns-8",
		deskCols === "9" && "desk:columns-9",
		deskCols === "10" && "desk:columns-10",
		deskCols === "11" && "desk:columns-11",
		deskCols === "12" && "desk:columns-12",

		// Horizontal Gaps (CSS columns gap)
		gap === "0" && "gap-0",
		gap === "2" && "gap-2",
		gap === "4" && "gap-4",
		gap === "6" && "gap-6",
		gap === "8" && "gap-8",

		// Vertical Gaps (Targeting children)
		"*:break-inside-avoid",
		gap === "0" && "*:mb-0",
		gap === "2" && "*:mb-2",
		gap === "4" && "*:mb-4",
		gap === "6" && "*:mb-6",
		gap === "8" && "*:mb-8",

		className,
	)}
  {...restProps}
>
  {@render children?.()}
</div>
