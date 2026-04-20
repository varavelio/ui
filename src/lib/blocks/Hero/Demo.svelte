<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";
  import Button from "../../components/Button/Button.svelte";
  import Hero from "./Hero.svelte";
</script>

<div class="flex flex-col gap-12">
  <!-- Center Aligned -->
  <Hero
    title="Build faster with Varavel UI"
    description="A minimalist, high-contrast Svelte 5 component library built with Tailwind CSS 4. Focused on accessibility, precision, and performance."
  >
    {#snippet actions()}
      <Button size="lg" iconRight={ArrowRight}>Get Started</Button>
      <Button variant="outline" size="lg">Star on GitHub</Button>
    {/snippet}
  </Hero>

  <!-- Left Aligned with Visual -->
  <Hero
    align="left"
    title="Modern UI for modern developers"
    description="Stop fighting your UI library. Varavel UI provides the primitives you need to build beautiful interfaces without the bloat."
  >
    {#snippet actions()}
      <Button size="lg">Documentation</Button>
      <Button variant="ghost" size="lg">Learn More</Button>
    {/snippet}

    {#snippet visual()}
      <div
        class="aspect-video w-full overflow-hidden rounded-lg border border-base-400 bg-base-200 shadow-sm flex items-center justify-center"
      >
        <span class="text-content-muted">Visual Placeholder</span>
      </div>
    {/snippet}
  </Hero>
</div>
