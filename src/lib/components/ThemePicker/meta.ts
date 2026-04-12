import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "ThemePicker",
    demo: Demo,
    category: "Utilities & Preferences",
    props: [
      prop(
        "value",
        '"light" | "dark" | "system"',
        "Controlled theme mode.",
        '"system"',
      ),
    ],
  },
]);
