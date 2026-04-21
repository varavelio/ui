<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";
  import { Pricing } from "../index.js";

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "A compact plan for prototypes and internal tools.",
      cta: { label: "Start free", href: "#", variant: "outline" as const },
      features: [
        "Unlimited local projects",
        "Core component library",
        "Community support",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      price: "$49",
      period: "/month",
      description: "The opinionated default for serious product teams.",
      badge: "Popular",
      featured: true,
      cta: { label: "Choose Scale", href: "#", iconRight: ArrowRight },
      features: [
        "Everything in Starter",
        "Blocks and advanced layouts",
        "Theme runtime and support",
        "Reusable marketing scaffolds",
      ],
      footnote: "Billed monthly. Cancel whenever you want.",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "For teams standardizing multiple products and brands.",
      cta: { label: "Talk to sales", href: "#", variant: "outline" as const },
      features: [
        "Everything in Scale",
        "Design system rollout support",
        "Priority implementation guidance",
      ],
    },
  ];
</script>

<Pricing.Cards
  description="A direct pricing grid with one featured plan and enough structure to drop straight into a marketing page without rethinking spacing."
  disclaimer="All prices are illustrative demo content. Real billing logic stays outside the block."
  {plans}
  title="Pricing cards"
/>
