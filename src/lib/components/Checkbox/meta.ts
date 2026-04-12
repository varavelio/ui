import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Checkbox",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the root wrapper.",
      ),
      prop("id", "string", "Optional ID for the checkbox element."),
      prop("label", "string", "Label text rendered next to the checkbox."),
      prop("description", "string", "Helper text rendered below the label."),
      prop("checked", "boolean", "Bindable checked state.", "false"),
      prop(
        "indeterminate",
        "boolean",
        "Bindable indeterminate state.",
        "false",
      ),
      prop(
        "disabled",
        "boolean",
        "Prevents user interaction and dims the control.",
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
        "Marks the checkbox as a required field.",
        "false",
      ),
      prop("name", "string", "HTML input name attribute."),
      prop("value", "string", "HTML input value attribute."),
      prop("size", '"sm" | "md" | "lg"', "Visual size preset.", '"md"'),
      prop(
        "color",
        '"neutral" | "info" | "success" | "error"',
        "Semantic color representation for the checked state.",
        '"neutral"',
      ),
    ],
  },
]);
