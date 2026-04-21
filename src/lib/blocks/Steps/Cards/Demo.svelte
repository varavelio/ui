<script lang="ts">
  import { Layers, Rocket, Shield } from "@lucide/svelte";
  import { Steps } from "../index.js";

  const items = [
    {
      step: "01",
      title: "Choose the right block",
      description:
        "Start from a layout that already encodes hierarchy and spacing instead of composing the section from raw primitives.",
      icon: Layers,
    },
    {
      step: "02",
      title: "Feed it structured content",
      description:
        "Pass plain objects from your CMS, config, or route data so the section stays portable across projects.",
      icon: Rocket,
    },
    {
      step: "03",
      title: "Ship without second-guessing polish",
      description:
        "The block keeps the visual language intact on mobile and at the desk breakpoint while preserving accessibility.",
      icon: Shield,
    },
  ];
</script>

<Steps.Cards
  description="A more modular layout when each step needs equal weight in a grid."
  {items}
  title="Step cards"
/>
