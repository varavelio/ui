import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Dialog",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop("open", "boolean", "Controls the open state. Bindable.", "false"),
      prop("trigger", "Snippet", "Content that opens the dialog when clicked."),
      prop("title", "string", "Dialog heading displayed at the top."),
      prop("description", "string", "Introductory text below the title."),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Maximum width of the dialog.",
        '"md"',
      ),
      prop(
        "dismissible",
        "boolean",
        "Whether the dialog can be closed via Escape, outside click, or the X button.",
        "true",
      ),
      prop(
        "padded",
        "boolean",
        "If true, adds standard padding (p-6) to the content area.",
        "true",
      ),
      prop("footer", "Snippet", "Custom footer content (e.g. action buttons)."),
      prop("children", "Snippet", "Main body content of the dialog."),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes for the dialog content panel.",
      ),
    ],
  },
]);
