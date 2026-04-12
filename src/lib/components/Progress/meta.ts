import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Progress",
    demo: Demo,
    category: "Status & Feedback",
    props: [
      prop(
        "value",
        "number | null",
        "Current progress value. Use null for indeterminate state.",
        "0",
      ),
      prop("max", "number", "Maximum progress value.", "100"),
      prop("label", "string", "Optional label for the progress bar."),
      prop(
        "showValue",
        "boolean",
        "Whether to display the percentage text next to the label.",
        "false",
      ),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "error"',
        "The semantic color of the progress bar.",
        '"info"',
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "The visual thickness of the progress bar.",
        '"md"',
      ),
    ],
  },
]);
