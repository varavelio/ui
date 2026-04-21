import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "CTA.Banner",
    category: "Blocks",
    demo: Demo,
    props: [
      prop("eyebrow", "string", "Short label shown above the banner heading."),
      prop("title", "string", "Section heading for the banner CTA."),
      prop("description", "string", "Supporting copy for the banner CTA."),
      prop(
        "actions",
        "CTABannerAction[]",
        "Calls to action rendered in the banner.",
      ),
      prop("caption", "string", "Muted caption shown below the actions."),
    ],
  },
]);
