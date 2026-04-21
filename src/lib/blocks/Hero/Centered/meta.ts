import { components, prop } from "../../../catalog.js";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Hero.Centered",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the centered hero heading.",
      ),
      prop(
        "announcement",
        "HeroAnnouncement",
        "Inline announcement pill shown before the title.",
      ),
      prop("title", "string", "Primary centered hero headline."),
      prop(
        "description",
        "string",
        "Supporting description for the centered hero.",
      ),
      prop(
        "actions",
        "HeroCenteredAction[]",
        "Primary calls to action rendered beneath the copy.",
      ),
      prop(
        "stats",
        "HeroCenteredStat[]",
        "Optional supporting metrics rendered in a compact grid.",
      ),
      prop(
        "caption",
        "string",
        "Muted caption shown below the actions or metrics.",
      ),
    ],
  },
]);
