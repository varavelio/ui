import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Table",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop("Root.children", "Snippet", "Semantic table content."),
      prop(
        "Root.variant",
        '"default" | "ghost"',
        "Surface treatment for standalone or embedded tables.",
        '"default"',
      ),
      prop(
        "Root.size",
        '"sm" | "md" | "lg"',
        "Density preset for header and cell spacing.",
        '"md"',
      ),
      prop(
        "Root.striped",
        "boolean",
        "Whether body rows alternate surface tones.",
        "false",
      ),
      prop(
        "Root.stickyHeader",
        "boolean",
        "Whether header cells stay pinned while scrolling.",
        "false",
      ),
      prop(
        "Root.stickyFooter",
        "boolean",
        "Whether footer cells stay pinned while scrolling.",
        "false",
      ),
      prop(
        "Root.stickyColumn",
        "boolean",
        "Whether the first column stays pinned during horizontal scrolling.",
        "false",
      ),
      prop(
        "Root.stickyActions",
        "boolean",
        "Whether the last column stays pinned during horizontal scrolling.",
        "false",
      ),
      prop(
        "Root.class",
        "ClassValue",
        "Additional CSS classes for the table surface wrapper.",
      ),
      prop("Header.children", "Snippet", "Header rows."),
      prop(
        "Header.class",
        "ClassValue",
        "Additional CSS classes for the header section.",
      ),
      prop("Body.children", "Snippet", "Body rows."),
      prop(
        "Body.class",
        "ClassValue",
        "Additional CSS classes for the body section.",
      ),
      prop("Footer.children", "Snippet", "Footer rows."),
      prop(
        "Footer.class",
        "ClassValue",
        "Additional CSS classes for the footer section.",
      ),
      prop(
        "Caption.children",
        "Snippet",
        "Caption content. Use a single caption before the header for accessible table context. Hidden visually by default.",
      ),
      prop(
        "Caption.visible",
        "boolean",
        "Whether the caption should be shown visually above the table instead of remaining screen-reader only.",
        "false",
      ),
      prop(
        "Caption.class",
        "ClassValue",
        "Additional CSS classes for the caption, including visible overrides.",
      ),
      prop("Row.children", "Snippet", "Row cells."),
      prop("Row.class", "ClassValue", "Additional CSS classes for the row."),
      prop("Head.children", "Snippet", "Header cell content."),
      prop(
        "Head.class",
        "ClassValue",
        "Additional CSS classes for the header cell.",
      ),
      prop(
        "Head.align",
        '"left" | "center" | "right"',
        "Horizontal alignment for the cell content.",
        '"left"',
      ),
      prop(
        "Head.numeric",
        "boolean",
        "Whether the column represents numeric data.",
        "false",
      ),
      prop("Cell.children", "Snippet", "Cell content."),
      prop("Cell.class", "ClassValue", "Additional CSS classes for the cell."),
      prop(
        "Cell.align",
        '"left" | "center" | "right"',
        "Horizontal alignment for the cell content.",
        '"left"',
      ),
      prop(
        "Cell.numeric",
        "boolean",
        "Whether the cell represents numeric data.",
        "false",
      ),
    ],
  },
]);
