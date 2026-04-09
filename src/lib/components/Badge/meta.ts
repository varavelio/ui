import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Badge",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the badge element.",
      ),
      prop(
        "variant",
        '"solid" | "soft" | "outline"',
        "Presentation style for the badge.",
        '"soft"',
      ),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "danger"',
        "Semantic color representing the badge's intent.",
        '"neutral"',
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Compactness preset for the badge.",
        '"md"',
      ),
    ],
  },
]);
