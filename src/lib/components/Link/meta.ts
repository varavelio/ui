import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Link",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the anchor.",
      ),
      prop("href", "string", "Link destination."),
      prop(
        "external",
        "boolean",
        "Controls whether the link is treated as external. When omitted, external behavior is inferred from `href`.",
      ),
      prop(
        "disabled",
        "boolean",
        "Disables interaction, removes navigation behavior, and sets `aria-disabled`.",
        "false",
      ),
      prop(
        "target",
        '"_self" | "_blank" | "_parent" | "_top" | string',
        "Where to display the linked URL. Automatically defaults to `_blank` for external links.",
      ),
      prop(
        "rel",
        "string",
        "The relationship of the linked URL as space-separated link types. `noopener noreferrer` is automatically enforced when opening in a new tab.",
      ),
      prop("children", "Snippet", "Child snippet rendered inside the link."),
    ],
  },
]);
