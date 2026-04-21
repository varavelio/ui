import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Team.Grid",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the team grid heading.",
      ),
      prop("title", "string", "Section heading for the team grid."),
      prop("description", "string", "Supporting copy for the team grid."),
      prop("members", "TeamMember[]", "Team members rendered as cards."),
      prop(
        "columns",
        "2 | 3 | 4",
        "Desktop column count for the team grid.",
        "3",
      ),
      prop(
        "member",
        "Snippet<[TeamMember]>",
        "Optional override for rendering an individual team member card.",
      ),
    ],
  },
]);
