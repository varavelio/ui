import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Card",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the card container.",
      ),
      prop(
        "padding",
        '"none" | "sm" | "md" | "lg"',
        "Internal spacing preset for the card content.",
        '"md"',
      ),
      prop(
        "color",
        '"default" | "muted" | "contrast"',
        "Surface color variant.",
        '"default"',
      ),
      prop(
        "radius",
        '"none" | "sm" | "md" | "lg" | "xl" | "2xl"',
        "Corner radius preset.",
        '"lg"',
      ),
      prop(
        "shadow",
        '"none" | "sm" | "md" | "lg"',
        "Elevation shadow preset.",
        '"sm"',
      ),
      prop(
        "bordered",
        "boolean",
        "Whether the card should have a visible border.",
        "true",
      ),
    ],
  },
]);
