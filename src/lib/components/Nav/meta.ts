import { components, prop } from "../../catalog.js";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Nav",
    category: "Core Building Blocks",
    demo: Demo,
    props: [
      prop("Root.children", "Snippet", "The navigation items."),
      prop(
        "Link.href",
        "string",
        "Destination URL. Renders as an anchor tag if provided.",
      ),
      prop("Link.label", "string", "The text label of the link."),
      prop("Link.icon", "Component", "Optional Lucide-svelte icon component."),
      prop(
        "Link.isActive",
        "boolean",
        "Marks the link as currently active.",
        "false",
      ),
      prop("Group.label", "string", "The text label of the collapsible group."),
      prop("Group.icon", "Component", "Optional Lucide-svelte icon component."),
      prop(
        "Group.isOpen",
        "boolean",
        "Controls the open/collapsed state. Bindable.",
        "false",
      ),
      prop(
        "Group.line",
        '"dashed" | "solid" | "none"',
        "The border style for the nested children container.",
        '"dashed"',
      ),
      prop(
        "Group.borderWidth",
        '"1" | "2"',
        "Width of the indicator line.",
        '"2"',
      ),
    ],
  },
]);
