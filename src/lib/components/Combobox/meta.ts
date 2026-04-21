import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Combobox",
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
        "Icon component rendered before the input value.",
      ),
      prop(
        "iconRight",
        "Component",
        "Icon component rendered instead of the default chevron.",
      ),
      prop("id", "string", "Optional ID for the combobox input element."),
      prop("label", "string", "Label text for the combobox field."),
      prop("description", "string", "Secondary helper text."),
      prop(
        "placeholder",
        "string",
        "Placeholder text shown when the input is empty.",
        '"Search..."',
      ),
      prop(
        "items",
        "{ value; label; description?; disabled? }[]",
        "Array of options to render in the dropdown list.",
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
        "Marks the combobox as a required field.",
        "false",
      ),
      prop("name", "string", "HTML input name attribute."),
      prop(
        "allowDeselect",
        "boolean",
        "Allows clicking the selected option again to clear the selection.",
        "false",
      ),
      prop(
        "allowCustomValue",
        "boolean",
        "Allows values outside the dataset and commits unmatched input on close.",
        "false",
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Control height and typography size preset.",
        '"md"',
      ),
      prop(
        "radius",
        '"none" | "sm" | "md" | "lg" | "full"',
        "Corner radius preset.",
        '"md"',
      ),
      prop(
        "variant",
        '"default" | "ghost"',
        "Surface style variant.",
        '"default"',
      ),
      prop(
        "error",
        "boolean",
        "Marks the combobox as error and styles it accordingly.",
        "false",
      ),
      prop(
        "emptyMessage",
        "string",
        "Message shown when the current query does not match any option.",
        '"No results found."',
      ),
    ],
  },
]);
