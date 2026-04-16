import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Masonry",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "cols",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Columns on mobile viewport.",
        '"1"',
      ),
      prop(
        "deskCols",
        '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"',
        "Columns on desktop viewport (1024px+).",
        '"3"',
      ),
      prop(
        "gap",
        '"0" | "2" | "4" | "6" | "8"',
        "Spacing scale between items.",
        '"4"',
      ),
      prop("children", "Snippet", "Inner content of the masonry layout."),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the container.",
      ),
    ],
  },
]);
