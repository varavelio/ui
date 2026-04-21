import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Features.Grid",
    category: "Blocks",
    demo: Demo,
    props: [
      prop("eyebrow", "string", "Short label shown above the heading."),
      prop("title", "string", "Section heading for the feature grid."),
      prop(
        "description",
        "string",
        "Supporting copy used to frame the feature collection.",
      ),
      prop(
        "items",
        "FeatureGridItem[]",
        "Feature cards rendered by the block.",
      ),
      prop("columns", "2 | 3 | 4", "Desktop column count.", "3"),
      prop(
        "item",
        "Snippet<[FeatureGridItem]>",
        "Optional escape hatch to override how a single feature item is rendered.",
      ),
    ],
  },
]);
