import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "ThemePicker",
    demo: Demo,
    category: "Utilities & Preferences",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the trigger.",
      ),
      prop(
        "value",
        '"light" | "dark" | "system"',
        "Bound theme value.",
        '"system"',
      ),
      prop("label", "string", "Visible trigger label text.", '"Theme"'),
      prop(
        "showLabel",
        "boolean",
        "Shows the visible Theme label next to the icon.",
        "true",
      ),
      prop("size", '"sm" | "md" | "lg"', "Button size preset.", '"md"'),
      prop(
        "radius",
        '"sm" | "md" | "lg" | "full"',
        "Button border radius preset.",
        '"md"',
      ),
      prop(
        "variant",
        '"solid" | "outline" | "ghost"',
        "Button appearance variant.",
        '"outline"',
      ),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "error"',
        "Semantic color for the button.",
        '"neutral"',
      ),
      prop(
        "square",
        "boolean",
        "Whether the button should have a square aspect ratio.",
        "false",
      ),
      prop(
        "wide",
        "boolean",
        "Whether the button should span the full width of its container.",
        "false",
      ),
    ],
  },
]);
