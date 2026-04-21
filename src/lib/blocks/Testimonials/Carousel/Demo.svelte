<script lang="ts">
  import { Testimonials } from "../index.js";

  const items = [
    {
      quote:
        "Varavel UI removed the usual landing-page drift. We give it data and the page already looks deliberate.",
      name: "Maya Chen",
      role: "Product Designer",
      company: "Northstar",
      rating: 5 as const,
    },
    {
      quote:
        "The blocks feel like a design team made the decisions ahead of time. That is exactly what we wanted.",
      name: "Jon Alvarez",
      role: "Founder",
      company: "Framebase",
      rating: 5 as const,
    },
    {
      quote:
        "It is the first Svelte UI library we could plug into a CMS-driven site without rewriting every section.",
      name: "Aisha Rahman",
      role: "Engineering Lead",
      company: "Relay",
      rating: 5 as const,
    },
  ];
</script>

<Testimonials.Carousel
  description="A spotlight testimonial with manual controls and compact jump targets for the rest of the quotes."
  {items}
  title="Testimonial carousel"
/>
