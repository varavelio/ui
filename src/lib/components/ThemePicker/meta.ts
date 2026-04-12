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
      prop(
        "ghost",
        "boolean",
        "Uses the ghost button style for the trigger.",
        "false",
      ),
      prop(
        "circular",
        "boolean",
        "Renders a circular icon-only trigger using a full radius.",
        "false",
      ),
    ],
  },
]);
