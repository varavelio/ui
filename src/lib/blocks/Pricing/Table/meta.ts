import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Pricing.Table",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the comparison table heading.",
      ),
      prop("title", "string", "Section heading for the pricing table."),
      prop("description", "string", "Supporting copy for the pricing table."),
      prop(
        "plans",
        "PricingTablePlan[]",
        "Plan summaries rendered across the comparison surface.",
      ),
      prop(
        "groups",
        "PricingFeatureGroup[]",
        "Grouped feature matrix used by both mobile and desktop layouts.",
      ),
      prop(
        "disclaimer",
        "string",
        "Muted legal or billing note shown below the table.",
      ),
    ],
  },
]);
