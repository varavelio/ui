import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "BlogList.Grid",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the blog grid heading.",
      ),
      prop("title", "string", "Section heading for the blog grid."),
      prop("description", "string", "Supporting copy for the blog grid."),
      prop("posts", "BlogListGridPost[]", "Posts rendered as editorial cards."),
      prop("columns", "2 | 3", "Desktop column count for the blog grid.", "3"),
      prop(
        "post",
        "Snippet<[BlogListGridPost]>",
        "Optional override for rendering an individual post card.",
      ),
    ],
  },
]);
