<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../helpers/cn.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Inner content of the bento item.
     */
    children?: Snippet;

    /**
     * Column span for non-desktop layouts.
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
     * Row span for non-desktop layouts.
     * @default "1"
     */
    rows?:
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
     * Column span for desktop layouts.
     * @default "4"
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
     * Row span for desktop layouts.
     * @default "1"
     */
    deskRows?:
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
  }

  let {
    children,
    cols = "1",
    rows = "1",
    deskCols = "4",
    deskRows = "1",
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div
  {...restProps}
  class={cn(
    "relative h-full min-h-24 overflow-hidden",
    {
      "col-span-1": cols === "1",
      "col-span-2": cols === "2",
      "col-span-3": cols === "3",
      "col-span-4": cols === "4",
      "col-span-5": cols === "5",
      "col-span-6": cols === "6",
      "col-span-7": cols === "7",
      "col-span-8": cols === "8",
      "col-span-9": cols === "9",
      "col-span-10": cols === "10",
      "col-span-11": cols === "11",
      "col-span-12": cols === "12",
      "row-span-1": rows === "1",
      "row-span-2": rows === "2",
      "row-span-3": rows === "3",
      "row-span-4": rows === "4",
      "row-span-5": rows === "5",
      "row-span-6": rows === "6",
      "row-span-7": rows === "7",
      "row-span-8": rows === "8",
      "row-span-9": rows === "9",
      "row-span-10": rows === "10",
      "row-span-11": rows === "11",
      "row-span-12": rows === "12",
      "desk:col-span-1": deskCols === "1",
      "desk:col-span-2": deskCols === "2",
      "desk:col-span-3": deskCols === "3",
      "desk:col-span-4": deskCols === "4",
      "desk:col-span-5": deskCols === "5",
      "desk:col-span-6": deskCols === "6",
      "desk:col-span-7": deskCols === "7",
      "desk:col-span-8": deskCols === "8",
      "desk:col-span-9": deskCols === "9",
      "desk:col-span-10": deskCols === "10",
      "desk:col-span-11": deskCols === "11",
      "desk:col-span-12": deskCols === "12",
      "desk:row-span-1": deskRows === "1",
      "desk:row-span-2": deskRows === "2",
      "desk:row-span-3": deskRows === "3",
      "desk:row-span-4": deskRows === "4",
      "desk:row-span-5": deskRows === "5",
      "desk:row-span-6": deskRows === "6",
      "desk:row-span-7": deskRows === "7",
      "desk:row-span-8": deskRows === "8",
      "desk:row-span-9": deskRows === "9",
      "desk:row-span-10": deskRows === "10",
      "desk:row-span-11": deskRows === "11",
      "desk:row-span-12": deskRows === "12",
    },
    className,
  )}
>
  {@render children?.()}
</div>
