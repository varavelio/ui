import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Breadcrumbs",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the breadcrumb root.",
      ),
      prop(
        "ariaLabel",
        "string",
        "Screen reader label for the navigation landmark.",
        '"Breadcrumb"',
      ),
      prop(
        "items",
        "{ label; icon; href?; onClick?; disabled? }[]",
        "Ordered breadcrumb steps. Last step is always active; each item can render as link, button, or text.",
      ),
      prop(
        "items[].label",
        "string",
        "Visible text shown for the breadcrumb step.",
      ),
      prop(
        "items[].icon",
        "Component",
        "Lucide/Svelte icon component rendered before the label.",
      ),
      prop(
        "items[].href",
        "string",
        "Optional link destination. If present and enabled, the step renders as an anchor.",
      ),
      prop(
        "items[].onClick",
        "() => void",
        "Optional click handler. If present without href and enabled, the step renders as a button.",
      ),
      prop(
        "items[].disabled",
        "boolean",
        "Disables interaction and mutes the item when true.",
        "false",
      ),
    ],
  },
]);
