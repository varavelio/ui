import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Pagination",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the pagination wrapper.",
      ),
      prop("count", "number", "Total number of items to paginate."),
      prop("page", "number", "Bindable selected page.", "1"),
      prop("perPage", "number", "Number of items per page.", "10"),
      prop(
        "siblingCount",
        "number",
        "Number of visible page buttons on each side of the active page.",
        "1",
      ),
      prop(
        "loop",
        "boolean",
        "Whether keyboard navigation should loop at the ends.",
        "false",
      ),
      prop(
        "showSummary",
        "boolean",
        "Shows the visible item range below the controls.",
        "false",
      ),
      prop(
        "hideIfSinglePage",
        "boolean",
        "Hides pagination when there is only one page.",
        "true",
      ),
      prop(
        "ariaLabel",
        "string",
        "Accessible label for the navigation landmark.",
        '"Pagination"',
      ),
      prop(
        "prevLabel",
        "string",
        "Accessible label for the previous button.",
        '"Previous"',
      ),
      prop(
        "nextLabel",
        "string",
        "Accessible label for the next button.",
        '"Next"',
      ),
    ],
  },
]);
