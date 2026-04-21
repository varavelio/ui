import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Stats.Grid",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the stats grid heading.",
      ),
      prop("title", "string", "Section heading for the stats grid."),
      prop("description", "string", "Supporting copy for the stats grid."),
      prop(
        "items",
        "StatsGridItem[]",
        "Metrics rendered as compact stat cards.",
      ),
      prop(
        "columns",
        "2 | 3 | 4",
        "Desktop column count for the stats grid.",
        "4",
      ),
    ],
  },
]);
