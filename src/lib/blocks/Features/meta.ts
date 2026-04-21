import { components } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Features",
    category: "Blocks",
    demo: Demo,
    props: [
      {
        name: "title",
        type: "string | Snippet",
        description: "Title of the feature section.",
      },
      {
        name: "description",
        type: "string | Snippet",
        description: "Subtitle or description.",
      },
      {
        name: "children",
        type: "Snippet",
        description: "Grid items.",
      },
      {
        name: "columns",
        type: "1 | 2 | 3 | 4",
        description: "Number of columns on desktop.",
      },
    ],
  },
]);
