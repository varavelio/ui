import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Copy",
    demo: Demo,
    category: "Utilities & Preferences",
    props: [
      prop("text", "string", "Plain text copied to the clipboard."),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the button.",
      ),
      prop(
        "label",
        "string",
        "Accessible label and default tooltip content.",
        '"Copy to clipboard"',
      ),
      prop(
        "copiedLabel",
        "string",
        "Tooltip and live-region text shown after a successful copy.",
        '"Copied"',
      ),
      prop(
        "timeout",
        "number",
        "How long the success state stays visible in milliseconds.",
        "2000",
      ),
      prop("size", '"sm" | "md" | "lg"', "Button size preset.", '"sm"'),
      prop(
        "quiet",
        "boolean",
        "Suppresses runtime toast feedback and keeps only local button feedback.",
        "false",
      ),
      prop(
        "side",
        '"top" | "bottom" | "left" | "right"',
        "Preferred tooltip placement.",
        '"top"',
      ),
      prop("disabled", "boolean", "Disables copying.", "false"),
    ],
  },
]);
