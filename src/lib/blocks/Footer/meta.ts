import { components } from "../../catalog.js";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Footer",
    category: "Blocks",
    demo: Demo,
    props: [
      {
        name: "brand",
        type: "Snippet",
        description: "Brand content (logo, name, etc).",
      },
      {
        name: "copyright",
        type: "string | Snippet",
        description: "Copyright text or snippet.",
      },
      {
        name: "children",
        type: "Snippet",
        description: "Footer links/sections.",
      },
      {
        name: "bottomActions",
        type: "Snippet",
        description: "Bottom bar actions/links.",
      },
    ],
  },
]);
