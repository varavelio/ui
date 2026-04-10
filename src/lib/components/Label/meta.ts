import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Label",
    demo: Demo,
    category: "Form Controls",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the label element.",
      ),
      prop("for", "string", "ID of the form control this label is bound to."),
      prop(
        "required",
        "boolean",
        "If true, displays a red asterisk indicating the field is required.",
        "false",
      ),
      prop("color", '"default" | "muted"', "Text color preset.", '"default"'),
      prop("size", '"sm" | "md" | "lg"', "Typography size preset.", '"md"'),
    ],
  },
]);
