import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Heading",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop("class", "string", "Additional CSS classes to apply."),
      prop(
        "level",
        '"1" | "2" | "3" | "4" | "5" | "6"',
        "The HTML heading level (h1-h6).",
        '"1"',
      ),
      prop(
        "size",
        '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"',
        "Visual size preset.",
        '"xl"',
      ),
      prop("muted", "boolean", "Whether to apply a muted text color.", "false"),
      prop("children", "Snippet", "The content of the heading."),
    ],
  },
]);
