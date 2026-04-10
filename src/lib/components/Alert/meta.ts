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
        '"neutral" | "info" | "success" | "warning" | "danger"',
        "Semantic visual color.",
        '"neutral"',
      ),
      prop("children", "Snippet", "Custom content to render inside the alert."),
      prop("class", "string", "Additional CSS classes to apply."),
    ],
  },
]);
