import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Tabs",
    demo: Demo,
    category: "Disclosure & Expansion",
    props: [
      prop("items", "TabItem[]", "Array of tab items to render."),
      prop("value", "string", "The bound value of the currently selected tab."),
      prop(
        "orientation",
        '"horizontal" | "vertical"',
        "The orientation of the tabs layout.",
        '"horizontal"',
      ),
      prop(
        "activationMode",
        '"automatic" | "manual"',
        "How keyboard focus activates tabs.",
        '"automatic"',
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Visual size preset of the tabs.",
        '"md"',
      ),
      prop(
        "color",
        '"neutral" | "info" | "success" | "warning" | "error"',
        "Semantic color of the active tab.",
        '"neutral"',
      ),
      prop(
        "bg",
        '"100" | "200" | "300"',
        "The background color preset for the tab list.",
        '"300"',
      ),
    ],
  },
]);
