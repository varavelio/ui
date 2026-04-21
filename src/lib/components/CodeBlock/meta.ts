import { components, prop } from "../../catalog.js";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "CodeBlock",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "rawCode",
        "string",
        "The raw source code string for copying and downloading.",
      ),
      prop(
        "highlightedHtml",
        "string",
        "The pre-highlighted HTML string (e.g., from Shiki, Prism). If not provided, rawCode is rendered.",
      ),
      prop(
        "title",
        "string",
        "Optional title or language to display in the header.",
        '"Code"',
      ),
      prop(
        "fileName",
        "string",
        "Optional filename for the download action. Defaults to `code.{extension}` based on the title.",
      ),
      prop(
        "bordered",
        "boolean",
        "Whether to show a border around the block.",
        "true",
      ),
      prop(
        "scrollX",
        "boolean",
        "Whether to allow horizontal scrolling for long lines.",
        "true",
      ),
      prop(
        "scrollY",
        "boolean",
        "Whether to allow vertical scrolling for tall blocks.",
        "true",
      ),
      prop("showCopy", "boolean", "Whether to show the copy button.", "true"),
      prop(
        "showDownload",
        "boolean",
        "Whether to show the download button.",
        "true",
      ),
      prop(
        "showLineNumbers",
        "boolean",
        "Whether to style line numbers (assumes Shiki/Prism generates `.line` elements).",
        "true",
      ),
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the container.",
      ),
    ],
  },
]);
