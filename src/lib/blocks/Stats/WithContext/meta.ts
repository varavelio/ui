import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Stats.WithContext",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the contextual stats heading.",
      ),
      prop(
        "title",
        "string",
        "Section heading for the contextual stats layout.",
      ),
      prop(
        "description",
        "string",
        "Supporting copy for the contextual stats layout.",
      ),
      prop(
        "items",
        "StatsWithContextItem[]",
        "Metrics rendered beside the explanatory copy.",
      ),
      prop(
        "actions",
        "StatsWithContextAction[]",
        "Calls to action rendered below the contextual copy.",
      ),
      prop("caption", "string", "Muted caption shown below the actions."),
    ],
  },
]);
