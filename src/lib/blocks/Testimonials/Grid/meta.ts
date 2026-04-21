import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Testimonials.Grid",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the testimonial grid heading.",
      ),
      prop("title", "string", "Section heading for the testimonial grid."),
      prop(
        "description",
        "string",
        "Supporting copy for the testimonial grid.",
      ),
      prop(
        "items",
        "TestimonialsGridItem[]",
        "Testimonials rendered as cards.",
      ),
      prop(
        "columns",
        "2 | 3",
        "Desktop column count for the testimonial grid.",
        "3",
      ),
      prop(
        "testimonial",
        "Snippet<[TestimonialsGridItem]>",
        "Optional override for rendering an individual testimonial card.",
      ),
    ],
  },
]);
