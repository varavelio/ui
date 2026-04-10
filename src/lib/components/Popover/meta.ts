import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Popover",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop("trigger", "Snippet", "Trigger content."),
      prop("title", "string", "Optional popover heading."),
      prop("open", "boolean", "Controls the open state.", "false"),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Maximum width of the popover.",
        '"md"',
      ),
      prop(
        "side",
        '"top" | "bottom" | "left" | "right"',
        "Preferred placement.",
        '"bottom"',
      ),
      prop("padded", "boolean", "If true, adds standard padding.", "true"),
      prop("class", "ClassValue", "Additional CSS classes for content."),
    ],
  },
]);
