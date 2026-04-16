import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Sheet",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop("open", "boolean", "Controls the open state. Bindable.", "false"),
      prop("title", "string", "Short heading shown at the top."),
      prop("description", "string", "Supporting text shown below the title."),
      prop(
        "side",
        '"left" | "right" | "bottom"',
        "Side the sheet opens from.",
        '"left"',
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Width or height preset based on the anchored side.",
        '"md"',
      ),
      prop(
        "dismissible",
        "boolean",
        "Whether the sheet can be closed by pressing Escape, interacting outside, or using the close button.",
        "true",
      ),
      prop(
        "padded",
        "boolean",
        "Whether the body receives default padding.",
        "true",
      ),
      prop("trigger", "Snippet", "Trigger content that opens the sheet."),
      prop("footer", "Snippet", "Optional footer content, usually actions."),
      prop("children", "Snippet", "Main sheet content."),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes for the sheet panel.",
      ),
    ],
  },
]);
