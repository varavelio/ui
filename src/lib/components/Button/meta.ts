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
        '"neutral" | "info" | "success" | "warning" | "error"',
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
      prop(
        "active",
        "boolean",
        "Forces the hover style to represent an active state.",
        "false",
      ),
      prop("wide", "boolean", "Expands button to full width.", "false"),
      prop(
        "square",
        "boolean",
        "Whether the button should have a square aspect ratio.",
        "false",
      ),
      prop(
        "alignContent",
        '"left" | "center" | "right" | "between"',
        "Inner content alignment.",
        '"center"',
      ),
    ],
  },
]);
