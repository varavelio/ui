import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Skeleton",
    demo: Demo,
    category: "Status & Feedback",
    props: [prop("class", "ClassValue", "Additional CSS classes to apply.")],
  },
]);
