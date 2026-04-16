import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Bento",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop("Grid.children", "Snippet", "Inner content of the bento grid."),
      prop(
        "Grid.cols",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Column count for non-desktop layouts.",
        '"1"',
      ),
      prop(
        "Grid.deskCols",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Column count for desktop layouts (1024px+).",
        '"12"',
      ),
      prop(
        "Grid.gap",
        '"0" | "2" | "4" | "6" | "8"',
        "Spacing scale between grid items.",
        '"4"',
      ),
      prop(
        "Grid.class",
        "ClassValue",
        "Additional CSS classes to apply to the grid wrapper.",
      ),
      prop("Item.children", "Snippet", "Inner content of the bento item."),
      prop(
        "Item.cols",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Column span for non-desktop layouts.",
        '"1"',
      ),
      prop(
        "Item.rows",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Row span for non-desktop layouts.",
        '"1"',
      ),
      prop(
        "Item.deskCols",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Column span for desktop layouts (1024px+).",
        '"4"',
      ),
      prop(
        "Item.deskRows",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Row span for desktop layouts (1024px+).",
        '"1"',
      ),
      prop(
        "Item.class",
        "ClassValue",
        "Additional CSS classes to apply to the item surface.",
      ),
    ],
  },
]);
