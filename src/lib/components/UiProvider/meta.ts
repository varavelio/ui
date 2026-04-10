import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "UiProvider",
    demo: Demo,
    category: "Utilities & Preferences",
    props: [
      prop(
        "children",
        "Snippet",
        "The application content wrapped by the provider.",
      ),
    ],
  },
]);
