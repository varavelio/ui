import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Faq.Split",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the split FAQ heading.",
      ),
      prop("title", "string", "Section heading for the split FAQ."),
      prop("description", "string", "Supporting copy for the split FAQ."),
      prop(
        "items",
        "FaqSplitItem[]",
        "Questions and answers rendered inside the accordion.",
      ),
      prop(
        "support",
        "FaqSupport",
        "Optional support panel content rendered beside the FAQ.",
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
