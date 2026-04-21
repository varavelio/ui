import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Tooltip",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop(
        "as",
        '"span" | "div" | "button"',
        "HTML tag used for the trigger wrapper. Defaults to `span` for inline-safe usage.",
        '"span"',
      ),
      prop(
        "content",
        "string | Snippet",
        "Tooltip content. Can be a string or a Svelte snippet for rich content.",
      ),
      prop(
        "side",
        '"top" | "bottom" | "left" | "right"',
        "Preferred placement.",
        '"top"',
      ),
      prop("delay", "number", "Hover delay before opening.", "0"),
      prop(
        "disabled",
        "boolean",
        "If true, prevents the tooltip from opening.",
        "false",
      ),
      prop("padded", "boolean", "If true, adds standard padding.", "true"),
      prop(
        "triggerClass",
        "ClassValue",
        "Additional CSS classes to apply to the trigger element.",
      ),
      prop(
        "contentClass",
        "ClassValue",
        "Additional CSS classes to apply to the tooltip content box.",
      ),
    ],
  },
]);
