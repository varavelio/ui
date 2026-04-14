import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Prose",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop("class", "string", "Additional CSS classes to apply."),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Typography scale preset for prose content.",
        '"md"',
      ),
      prop(
        "fluid",
        "boolean",
        "Removes typography max-width constraint when true.",
        "false",
      ),
      prop("children", "Snippet", "Rich content rendered inside Prose."),
    ],
  },
]);
