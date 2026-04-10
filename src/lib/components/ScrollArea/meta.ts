import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "ScrollArea",
    demo: Demo,
    category: "Utilities & Preferences",
    props: [
      prop(
        "orientation",
        '"vertical" | "horizontal" | "both"',
        "Which scrollbars to render.",
        '"vertical"',
      ),
      prop(
        "type",
        '"hover" | "scroll" | "auto" | "always"',
        "Scrollbar visibility behavior.",
        '"hover"',
      ),
      prop(
        "scrollHideDelay",
        "number",
        "Time in milliseconds before scrollbars are hidden after scrolling stops.",
        "600",
      ),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the scroll area root.",
      ),
      prop(
        "viewportClass",
        "ClassValue",
        "Additional CSS classes to apply to the viewport container.",
      ),
    ],
  },
]);
