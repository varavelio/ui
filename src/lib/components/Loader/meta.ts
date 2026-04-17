import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Loader",
    demo: Demo,
    category: "Status & Feedback",
    props: [
      prop(
        "class",
        "ClassValue",
        "Additional CSS classes to apply to the loader icon.",
      ),
      prop(
        "size",
        '"sm" | "md" | "lg"',
        "Visual size preset of the loader icon.",
        '"md"',
      ),
    ],
  },
]);
