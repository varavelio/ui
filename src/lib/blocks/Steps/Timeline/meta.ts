import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Steps.Timeline",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the step timeline heading.",
      ),
      prop("title", "string", "Section heading for the step timeline."),
      prop("description", "string", "Supporting copy for the step timeline."),
      prop(
        "items",
        "StepsTimelineItem[]",
        "Steps rendered in a connected vertical flow.",
      ),
    ],
  },
]);
