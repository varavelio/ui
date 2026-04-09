import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Separator",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the separator root.",
      ),
      prop(
        "orientation",
        '"horizontal" | "vertical"',
        "Layout orientation of the separator divider.",
        '"horizontal"',
      ),
      prop(
        "decorative",
        "boolean",
        "Whether the separator is purely decorative (hidden from assistive technologies).",
        "true",
      ),
      prop(
        "inset",
        '"none" | "sm" | "md" | "lg"',
        "Internal spacing preset for the separator.",
        '"none"',
      ),
    ],
  },
]);
