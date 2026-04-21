<script lang="ts">
  import { Pricing } from "../index.js";

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "Best for evaluation and side projects.",
      cta: { label: "Start free", href: "#", variant: "outline" as const },
    },
    {
      id: "scale",
      name: "Scale",
      price: "$49",
      period: "/month",
      description: "Most teams land here.",
      badge: "Popular",
      featured: true,
      cta: { label: "Upgrade", href: "#" },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "Security, rollout support, and multi-team governance.",
      cta: { label: "Contact sales", href: "#", variant: "outline" as const },
    },
  ];

  const groups = [
    {
      title: "Shipping",
      items: [
        {
          label: "Core components",
          description:
            "Buttons, forms, overlays, tables, and runtime primitives.",
          availability: { starter: true, scale: true, enterprise: true },
        },
        {
          label: "Opinionated blocks",
          description:
            "Hero, pricing, testimonials, newsletter, blog, and more.",
          availability: { starter: false, scale: true, enterprise: true },
        },
      ],
    },
    {
      title: "Scale",
      items: [
        {
          label: "Projects",
          availability: {
            starter: "3",
            scale: "Unlimited",
            enterprise: "Unlimited",
          },
        },
        {
          label: "Support SLA",
          availability: { starter: false, scale: "48h", enterprise: "24h" },
        },
      ],
    },
  ];
</script>

<Pricing.Table
  description="A comparison table that collapses into mobile cards while preserving clear plan differences at the desk breakpoint."
  {groups}
  {plans}
  title="Pricing comparison"
/>
