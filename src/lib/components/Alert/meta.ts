import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Alert",
    demo: Demo,
    category: "Status & Feedback",
    props: [
      prop("title", "string", "Short heading for the alert block."),
      prop("description", "string", "Supporting message below the title."),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "error"',
        "Semantic visual color.",
        '"neutral"',
      ),
      prop("closable", "boolean", "Whether the alert can be closed.", "true"),
      prop("onClose", "() => void", "Callback fired when the alert is closed."),
      prop("children", "Snippet", "Custom content to render inside the alert."),
      prop("class", "string", "Additional CSS classes to apply."),
    ],
  },
]);
