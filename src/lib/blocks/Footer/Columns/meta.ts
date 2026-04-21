import { components, prop } from "../../../catalog.js";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Footer.Columns",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "brand",
        "FooterBrand",
        "Brand identity content shown in the first column.",
      ),
      prop(
        "columns",
        "FooterColumn[]",
        "Navigational groups rendered on the right side.",
      ),
      prop(
        "socialLinks",
        "FooterLink[]",
        "Inline social links shown in the bottom bar.",
      ),
      prop(
        "legalLinks",
        "FooterLink[]",
        "Secondary legal links shown beneath the copyright line.",
      ),
      prop(
        "copyright",
        "string",
        "Muted legal copy shown at the bottom of the footer.",
      ),
    ],
  },
]);
