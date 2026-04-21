import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Select",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the root wrapper.",
      ),
      prop(
        "icon",
        "Component",
        "Icon component rendered before the selected value.",
      ),
      prop(
        "iconRight",
        "Component",
        "Icon component rendered instead of the default chevron.",
      ),
      prop("label", "string", "Label text for the select field."),
      prop("description", "string", "Secondary helper text."),
      prop(
        "placeholder",
        "string",
        "Placeholder text shown when no option is selected.",
        '"Select an option"',
      ),
      prop(
        "items",
        "{ value; label; description?; disabled? }[]",
        "Array of options to render in the dropdown.",
      ),
      prop("value", "string", "Bindable selected value."),
      prop(
        "disabled",
        "boolean",
        "Prevents user interaction and dims the control.",
        "false",
      ),
      prop(
        "required",
        "boolean",
        "Marks the select as a required field.",
        "false",
      ),
      prop("name", "string", "HTML input name attribute."),
      prop(
        "allowDeselect",
        "boolean",
        "Allows the user to click the active option again to deselect it.",
        "false",
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Control height and typography size preset.",
        '"md"',
      ),
      prop(
        "variant",
        '"default" | "ghost"',
        "Surface style variant.",
        '"default"',
      ),
    ],
  },
]);
