import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "CTA.Split",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the split CTA heading.",
      ),
      prop("title", "string", "Section heading for the split CTA."),
      prop("description", "string", "Supporting copy for the split CTA."),
      prop(
        "actions",
        "CTASplitAction[]",
        "Calls to action rendered in the split CTA.",
      ),
      prop(
        "image",
        "CTASplitImage",
        "Default media payload rendered on the right side.",
      ),
      prop(
        "highlights",
        "string[]",
        "Short proof points rendered below the actions.",
      ),
      prop(
        "visual",
        "Snippet",
        "Optional escape hatch to fully override the right-side visual.",
      ),
    ],
  },
]);
