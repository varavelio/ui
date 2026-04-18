import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Logo",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the logo surface.",
      ),
      prop(
        "href",
        "string",
        "Optional link destination. If provided, the logo renders as an anchor.",
      ),
      prop("target", "string", "Where to display the linked URL."),
      prop(
        "rel",
        "string",
        "The relationship of the linked URL as space-separated link types.",
      ),
      prop(
        "ariaLabel",
        "string",
        "Accessible label for the logo trigger.",
        '"Varavel"',
      ),
      prop(
        "animate",
        "boolean",
        "Whether hover should morph the mark from the V pose into the A pose.",
        "true",
      ),
      prop(
        "contextMenu",
        "boolean",
        "Whether the context menu should be enabled.",
        "true",
      ),
    ],
  },
]);
