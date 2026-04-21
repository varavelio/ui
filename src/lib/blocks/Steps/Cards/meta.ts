import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Steps.Cards",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the step card heading.",
      ),
      prop("title", "string", "Section heading for the step cards."),
      prop("description", "string", "Supporting copy for the step cards."),
      prop("items", "StepsCardsItem[]", "Steps rendered as standalone cards."),
      prop(
        "columns",
        "2 | 3 | 4",
        "Desktop column count for the step cards.",
        "3",
      ),
    ],
  },
]);
