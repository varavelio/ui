import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Faq.Accordion",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the centered FAQ heading.",
      ),
      prop("title", "string", "Section heading for the centered FAQ."),
      prop("description", "string", "Supporting copy for the centered FAQ."),
      prop(
        "items",
        "FaqAccordionItem[]",
        "Questions and answers rendered inside the accordion.",
      ),
      prop(
        "openFirst",
        "boolean",
        "Whether the first accordion item is open on load.",
        "true",
      ),
    ],
  },
]);
