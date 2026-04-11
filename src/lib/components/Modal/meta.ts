import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Modal",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop("open", "boolean", "Controls the open state. Bindable.", "false"),
      prop("trigger", "Snippet", "Content that opens the modal when clicked."),
      prop("title", "string", "Modal heading displayed at the top."),
      prop("description", "string", "Introductory text below the title."),
      prop("size", '"sm" | "md" | "lg"', "Maximum width of the modal.", '"md"'),
      prop(
        "dismissible",
        "boolean",
        "Whether the modal can be closed via Escape, outside click, or the X button.",
        "true",
      ),
      prop(
        "padded",
        "boolean",
        "If true, adds standard padding (p-6) to the content area.",
        "true",
      ),
      prop("footer", "Snippet", "Custom footer content (e.g. action buttons)."),
      prop("children", "Snippet", "Main body content of the modal."),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes for the modal content panel.",
      ),
    ],
  },
]);
