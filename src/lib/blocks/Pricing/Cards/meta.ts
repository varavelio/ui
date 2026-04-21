import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Pricing.Cards",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the pricing card heading.",
      ),
      prop("title", "string", "Section heading for the pricing card grid."),
      prop(
        "description",
        "string",
        "Supporting copy for the pricing card grid.",
      ),
      prop(
        "plans",
        "PricingCardPlan[]",
        "Plans rendered as standalone pricing cards.",
      ),
      prop(
        "disclaimer",
        "string",
        "Muted legal or billing note shown below the cards.",
      ),
      prop(
        "plan",
        "Snippet<[PricingCardPlan]>",
        "Optional override for rendering an individual pricing card.",
      ),
    ],
  },
]);
