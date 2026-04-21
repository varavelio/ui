import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Testimonials.Marquee",
    category: "Blocks",
    demo: Demo,
    props: [
      prop("eyebrow", "string", "Short label shown above the marquee heading."),
      prop("title", "string", "Section heading for the marquee."),
      prop("description", "string", "Supporting copy for the marquee."),
      prop(
        "items",
        "TestimonialsMarqueeItem[]",
        "Testimonials repeated across the marquee track.",
      ),
      prop(
        "speed",
        '"slow" | "normal" | "fast"',
        "Animation speed for the marquee track.",
        '"normal"',
      ),
    ],
  },
]);
