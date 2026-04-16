<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Inner content of the bento grid.
     */
    children?: Snippet;

    /**
     * Column count for non-desktop layouts.
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
     * Column count for desktop layouts.
     * @default "12"
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
     * Spacing scale between grid items.
     * @default "4"
     */
    gap?: "0" | "2" | "4" | "6" | "8";
  }

  let {
    children,
    cols = "1",
    deskCols = "12",
    gap = "4",
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div
  {...restProps}
  class={cn(
    "grid w-full auto-rows-[minmax(6rem,auto)] grid-flow-dense",
    {
      "grid-cols-1": cols === "1",
      "grid-cols-2": cols === "2",
      "grid-cols-3": cols === "3",
      "grid-cols-4": cols === "4",
      "grid-cols-5": cols === "5",
      "grid-cols-6": cols === "6",
      "grid-cols-7": cols === "7",
      "grid-cols-8": cols === "8",
      "grid-cols-9": cols === "9",
      "grid-cols-10": cols === "10",
      "grid-cols-11": cols === "11",
      "grid-cols-12": cols === "12",
      "desk:grid-cols-1": deskCols === "1",
      "desk:grid-cols-2": deskCols === "2",
      "desk:grid-cols-3": deskCols === "3",
      "desk:grid-cols-4": deskCols === "4",
      "desk:grid-cols-5": deskCols === "5",
      "desk:grid-cols-6": deskCols === "6",
      "desk:grid-cols-7": deskCols === "7",
      "desk:grid-cols-8": deskCols === "8",
      "desk:grid-cols-9": deskCols === "9",
      "desk:grid-cols-10": deskCols === "10",
      "desk:grid-cols-11": deskCols === "11",
      "desk:grid-cols-12": deskCols === "12",
      "gap-0": gap === "0",
      "gap-2": gap === "2",
      "gap-4": gap === "4",
      "gap-6": gap === "6",
      "gap-8": gap === "8",
    },
    className,
  )}
>
  {@render children?.()}
</div>
