import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "LogoCloud.Marquee",
    category: "Blocks",
    demo: Demo,
    props: [
      prop("eyebrow", "string", "Short label shown above the marquee heading."),
      prop("title", "string", "Section heading for the logo marquee."),
      prop("description", "string", "Supporting copy for the logo marquee."),
      prop(
        "logos",
        "LogoCloudMarqueeLogo[]",
        "Logo items repeated through the marquee track.",
      ),
      prop(
        "speed",
        '"slow" | "normal" | "fast"',
        "Animation speed for the marquee track.",
        '"normal"',
      ),
    ],
  },
]);
