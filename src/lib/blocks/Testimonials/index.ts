import Carousel from "./Carousel/index.js";
import Grid from "./Grid/index.js";
import Marquee from "./Marquee/index.js";

export const Testimonials = {
  Grid: Grid,
  Carousel: Carousel,
  Marquee: Marquee,
} as const;
