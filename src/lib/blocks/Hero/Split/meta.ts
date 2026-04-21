import { components, prop } from "../../../catalog.js";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Hero.Split",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the split hero heading.",
      ),
      prop("title", "string", "Primary split hero headline."),
      prop(
        "description",
        "string",
        "Supporting description for the split hero.",
      ),
      prop(
        "actions",
        "HeroSplitAction[]",
        "Primary calls to action rendered beneath the copy.",
      ),
      prop(
        "highlights",
        "string[]",
        "Short proof points rendered in compact cards.",
      ),
      prop(
        "stats",
        "HeroSplitStat[]",
        "Optional supporting metrics rendered under the hero body.",
      ),
      prop(
        "visual",
        "HeroSplitVisual",
        "Default visual payload rendered on the right side.",
      ),
      prop(
        "visualContent",
        "Snippet",
        "Optional escape hatch to fully override the visual panel markup.",
      ),
    ],
  },
]);
