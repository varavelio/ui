<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";
  import { Hero } from "../index.js";

  const actions = [
    {
      label: "Get started",
      href: "#",
      iconRight: ArrowRight,
    },
    {
      label: "View docs",
      href: "#",
      variant: "outline" as const,
    },
  ];
</script>

<Hero.Centered
  {actions}
  announcement={{ label: "New blocks API", href: "#" }}
  caption="Trusted by product teams that want marketing sections to look intentional without hand-authoring every page."
  description="A data-driven hero designed for CMS-fed marketing sites, internal products, and landing pages that need strong hierarchy without visual noise."
  eyebrow="Opinionated by default"
  stats={[
    { value: "20+", label: "ready sections" },
    { value: "1 schema", label: "per block family" },
    { value: "0 guesswork", label: "for spacing and layout" },
  ]}
  title="Build faster with blocks that already know how to look good"
/>
