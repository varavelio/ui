import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "BlogList.Magazine",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the magazine layout heading.",
      ),
      prop("title", "string", "Section heading for the magazine layout."),
      prop("description", "string", "Supporting copy for the magazine layout."),
      prop(
        "posts",
        "BlogListMagazinePost[]",
        "Posts rendered with the first article featured prominently.",
      ),
    ],
  },
]);
