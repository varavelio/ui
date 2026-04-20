import { components } from "../../catalog.js";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Hero",
    category: "Blocks",
    demo: Demo,
    props: [
      {
        name: "title",
        type: "string | Snippet",
        description: "Main title of the hero section.",
      },
      {
        name: "description",
        type: "string | Snippet",
        description: "Description or subtitle text.",
      },
      {
        name: "actions",
        type: "Snippet",
        description: "Actions area (buttons, links, etc).",
      },
      {
        name: "visual",
        type: "Snippet",
        description: "Visual content (image, video, etc).",
      },
      {
        name: "align",
        type: "'left' | 'center'",
        description: "Alignment of the content.",
      },
    ],
  },
]);
