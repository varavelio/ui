import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Confirm",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop("open", "boolean", "Controls the open state. Bindable.", "false"),
      prop(
        "trigger",
        "Snippet",
        "Content that opens the confirm dialog when clicked.",
      ),
      prop("title", "string", "Heading displayed at the top."),
      prop("description", "string", "Explanation of what the action will do."),
      prop("cancelText", "string", "Label for the cancel button.", '"Cancel"'),
      prop(
        "actionText",
        "string",
        "Label for the confirmation button.",
        '"Continue"',
      ),
      prop(
        "actionColor",
        '"neutral" | "info" | "success" | "warning" | "danger"',
        "Semantic color of the action button.",
        '"danger"',
      ),
      prop(
        "onCancel",
        "() => void",
        "Callback fired before the dialog closes on cancel.",
      ),
      prop(
        "onConfirm",
        "() => void",
        "Callback fired before the dialog closes on confirm.",
      ),
      prop(
        "children",
        "Snippet",
        "Additional content between description and buttons.",
      ),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes for the content panel.",
      ),
    ],
  },
]);
