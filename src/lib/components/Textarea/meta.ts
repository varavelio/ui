import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Textarea",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the textarea element.",
      ),
      prop("value", "string | number", "Bindable current value."),
      prop(
        "variant",
        '"default" | "ghost"',
        "Surface style variant.",
        '"default"',
      ),
      prop(
        "radius",
        '"none" | "sm" | "md" | "lg"',
        "Corner radius preset.",
        '"md"',
      ),
      prop(
        "resize",
        '"none" | "vertical" | "auto"',
        "Allowed resizing directions.",
        '"vertical"',
      ),
      prop(
        "invalid",
        "boolean",
        "If true, applies error state styling.",
        "false",
      ),
    ],
  },
]);
