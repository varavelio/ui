import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Collapsible",
    demo: Demo,
    category: "Disclosure & Expansion",
    props: [
      prop("title", "string", "Heading shown in the collapsible header."),
      prop(
        "description",
        "string",
        "Optional supporting text under the title.",
      ),
      prop("open", "boolean", "Controlled expanded state."),
      prop(
        "size",
        "'sm' | 'md' | 'lg'",
        "The size of the collapsible items.",
        "md",
      ),
      prop(
        "showIcon",
        "boolean",
        "Whether to show the expand/collapse icon.",
        "true",
      ),
      prop(
        "iconPosition",
        "'left' | 'right'",
        "The position of the expand/collapse icon.",
        "left",
      ),
      prop(
        "bg",
        "'100' | '200' | '300'",
        "The background color preset.",
        "200",
      ),
    ],
  },
]);
