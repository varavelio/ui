import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Accordion",
    demo: Demo,
    category: "Disclosure & Expansion",
    props: [
      prop(
        "items",
        "{ value; label; content; disabled? }[]",
        "Accordion sections to render.",
      ),
      prop(
        "type",
        '"single" | "multiple"',
        "Whether one or many sections can be open.",
        '"single"',
      ),
      prop("value", "string | string[]", "Controlled open state."),
      prop("size", '"sm" | "md" | "lg"', "Density and spacing preset.", '"md"'),
      prop(
        "showIcon",
        "boolean",
        "Whether to display the chevron icon.",
        "true",
      ),
      prop(
        "iconPosition",
        '"left" | "right"',
        "Side to display the chevron icon.",
        '"left"',
      ),
      prop(
        "bg",
        '"100" | "200" | "300"',
        "The background color preset for the accordion surface.",
        '"200"',
      ),
    ],
  },
]);
