import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Menu",
    demo: Demo,
    category: "Overlays & Floating UI",
    props: [
      prop("trigger", "Snippet", "Trigger content that opens the menu."),
      prop("items", "Array", "Menu items, labels and separators."),
      prop("open", "boolean", "Controlled open state."),
      prop("side", "string", "The preferred side to render the menu."),
      prop(
        "mode",
        '"dropdown" | "context"',
        "Whether the menu opens as a standard dropdown or a context menu (right click).",
        '"dropdown"',
      ),
      prop("class", "string", "Additional CSS classes for the content."),
    ],
  },
]);
