import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Container",
    demo: Demo,
    category: "Core Building Blocks",
    props: [
      prop(
        "size",
        '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
        "The maximum width of the container.",
        '"md"',
      ),
      prop(
        "padded",
        "boolean",
        "Adds responsive horizontal padding (px-4 on mobile, px-8 on desktop).",
        "false",
      ),
      prop(
        "align",
        '"left" | "center" | "right"',
        "The horizontal alignment of the container within its parent.",
        '"center"',
      ),
    ],
  },
]);
