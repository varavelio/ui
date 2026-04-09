import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Kbd",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the kbd element.",
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Compactness preset for the keyboard key.",
        '"md"',
      ),
      prop("children", "Snippet", "Shortcut keys or key names to render."),
    ],
  },
]);
