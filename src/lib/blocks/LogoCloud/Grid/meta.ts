import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "LogoCloud.Grid",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the logo grid heading.",
      ),
      prop("title", "string", "Section heading for the logo grid."),
      prop("description", "string", "Supporting copy for the logo grid."),
      prop("logos", "LogoCloudGridLogo[]", "Logo items rendered in the grid."),
      prop(
        "columns",
        "2 | 3 | 4 | 5 | 6",
        "Desktop column count for the logo grid.",
        "5",
      ),
    ],
  },
]);
