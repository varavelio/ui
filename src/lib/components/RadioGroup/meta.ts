import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "RadioGroup",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the root wrapper.",
      ),
      prop("id", "string", "Optional ID for the radio group."),
      prop("label", "string", "Group label text."),
      prop("description", "string", "Group helper text."),
      prop(
        "items",
        "{ value; label; description?; disabled? }[]",
        "Array of options to render in the group.",
      ),
      prop("value", "string", "Bindable selected value.", '""'),
      prop(
        "disabled",
        "boolean",
        "Prevents user interaction with the entire group.",
        "false",
      ),
      prop(
        "readonly",
        "boolean",
        "Prevents user interaction but retains normal styling.",
        "false",
      ),
      prop(
        "required",
        "boolean",
        "Marks the radio group as a required field.",
        "false",
      ),
      prop("name", "string", "HTML input name attribute."),
      prop(
        "orientation",
        '"horizontal" | "vertical"',
        "Layout orientation of the items.",
        '"vertical"',
      ),
      prop("size", '"sm" | "md" | "lg"', "Visual size preset.", '"md"'),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "error"',
        "Semantic color representation for the selected state.",
        '"neutral"',
      ),
    ],
  },
]);
