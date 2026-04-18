import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "ColorPicker",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the root wrapper.",
      ),
      prop("label", "string", "Label text for the color field."),
      prop("description", "string", "Secondary helper text."),
      prop("size", '"sm" | "md" | "lg"', "Visual size preset.", '"md"'),
      prop(
        "radius",
        '"none" | "sm" | "md" | "lg" | "full"',
        "Corner radius preset.",
        '"md"',
      ),
      prop("variant", '"default" | "ghost"', "Surface variant.", '"default"'),
      prop(
        "error",
        "boolean",
        "Marks the field as error and styles it accordingly.",
        "false",
      ),
      prop("value", "string", "Bindable color value.", '"#000000"'),
    ],
  },
]);
