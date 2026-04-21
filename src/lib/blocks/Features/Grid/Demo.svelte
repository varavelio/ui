<script lang="ts">
  import { Layout, Shield, Sparkles, Zap } from "@lucide/svelte";
  import { Features } from "../index.js";

  const items = [
    {
      title: "Lightning Fast",
      description:
        "Built on top of Svelte 5 and Tailwind CSS 4 so the UI stays lean while pages stay responsive.",
      icon: Zap,
      badge: "Runtime",
    },
    {
      title: "Accessible",
      description:
        "Keyboard support, semantic structure, and sensible focus treatment are baked into the default layout.",
      icon: Shield,
      badge: "WCAG",
    },
    {
      title: "Customizable",
      description:
        "The monochrome system adapts to product branding without asking consumers to rebuild the section.",
      icon: Sparkles,
      badge: "Theme",
    },
    {
      title: "Modern Blocks",
      description:
        "Structured content beats ad-hoc markup when you need to ship fast from a CMS or configuration file.",
      icon: Layout,
      badge: "CMS-ready",
    },
  ];
</script>

<Features.Grid
  description="A ready-to-use features block that expects data, keeps the layout opinionated, and still leaves one escape hatch for custom item rendering."
  {items}
  title="Everything you need"
/>
