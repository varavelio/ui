import { components, prop } from "../../../catalog.ts";
import Demo from "./Demo.svelte";

export const componentMeta = components([
  {
    name: "Testimonials.Carousel",
    category: "Blocks",
    demo: Demo,
    props: [
      prop(
        "eyebrow",
        "string",
        "Short label shown above the carousel heading.",
      ),
      prop("title", "string", "Section heading for the carousel."),
      prop("description", "string", "Supporting copy for the carousel."),
      prop(
        "items",
        "TestimonialsCarouselItem[]",
        "Testimonials rotated through the spotlight carousel.",
      ),
    ],
  },
]);
