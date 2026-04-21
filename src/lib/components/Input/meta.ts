import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Input",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the input element.",
      ),
      prop(
        "icon",
        "Component",
        "Icon component rendered before the input value.",
      ),
      prop(
        "iconRight",
        "Component",
        "Icon component rendered after the input value.",
      ),
      prop("value", "string | number", "Bindable current value."),
      prop(
        "variant",
        '"default" | "ghost"',
        "Surface style variant.",
        '"default"',
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Visual height and padding preset.",
        '"md"',
      ),
      prop(
        "radius",
        '"none" | "sm" | "md" | "lg" | "full"',
        "Corner radius preset.",
        '"md"',
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
