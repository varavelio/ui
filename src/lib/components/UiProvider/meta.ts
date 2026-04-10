import { components, prop } from "../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "UiProvider",
    demo: Demo,
    category: "Utilities & Preferences",
    props: [
      prop(
        "tooltipDisabled",
        "boolean",
        "Disables tooltip provider behavior globally.",
        "false",
      ),
      prop(
        "tooltipDelayDuration",
        "number",
        "Delay before tooltips open, in milliseconds.",
        "250",
      ),
      prop(
        "tooltipSkipDelayDuration",
        "number",
        "Re-open delay window after a tooltip was recently shown, in milliseconds.",
        "150",
      ),
    ],
  },
]);
