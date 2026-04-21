<script lang="ts">
  import { Layout, Shield, Sparkles, Zap } from "@lucide/svelte";
  import Card from "../../components/Card/Card.svelte";
  import Features from "./Features.svelte";
</script>

<Features
  title="Everything you need"
  description="Varavel UI provides a comprehensive set of components and blocks to build your next big idea."
>
  <Card class="flex flex-col gap-4 p-6">
    <div
      class="flex size-10 items-center justify-center rounded-md bg-base-300"
    >
      <Zap class="size-6 text-content" />
    </div>
    <h3 class="text-xl font-medium text-content">Lightning Fast</h3>
    <p class="text-content-muted">
      Built on top of Svelte 5 and Tailwind CSS 4 for maximum performance.
    </p>
  </Card>

  <Card class="flex flex-col gap-4 p-6">
    <div
      class="flex size-10 items-center justify-center rounded-md bg-base-300"
    >
      <Shield class="size-6 text-content" />
    </div>
    <h3 class="text-xl font-medium text-content">Accessible</h3>
    <p class="text-content-muted">
      Follows WAI-ARIA patterns and ensures keyboard navigation works
      out-of-the-box.
    </p>
  </Card>

  <Card class="flex flex-col gap-4 p-6">
    <div
      class="flex size-10 items-center justify-center rounded-md bg-base-300"
    >
      <Sparkles class="size-6 text-content" />
    </div>
    <h3 class="text-xl font-medium text-content">Customizable</h3>
    <p class="text-content-muted">
      Easy to theme and adapt to your brand's unique visual identity.
    </p>
  </Card>

  <Card class="flex flex-col gap-4 p-6">
    <div
      class="flex size-10 items-center justify-center rounded-md bg-base-300"
    >
      <Layout class="size-6 text-content" />
    </div>
    <h3 class="text-xl font-medium text-content">Modern Blocks</h3>
    <p class="text-content-muted">
      Pre-composed sections that help you build entire pages in minutes.
    </p>
  </Card>
</Features>
