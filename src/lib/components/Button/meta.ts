import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Button",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the button element.",
      ),
      prop(
        "variant",
        '"solid" | "outline" | "ghost"',
        "Button appearance variant.",
        '"solid"',
      ),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "danger"',
        "Semantic color representing the button's intent.",
        '"neutral"',
      ),
      prop("size", '"sm" | "md" | "lg"', "Button size preset.", '"md"'),
      prop(
        "radius",
        '"sm" | "md" | "lg" | "full"',
        "Button border radius preset.",
        '"md"',
      ),
      prop(
        "loading",
        "boolean",
        "Shows a spinner and disables interaction.",
        "false",
      ),
      prop("block", "boolean", "Expands button to full width.", "false"),
    ],
  },
]);
