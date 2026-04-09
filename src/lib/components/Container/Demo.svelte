<script lang="ts">
  import { Card, Label } from "$lib/components/index.js";
  import Container from "./Container.svelte";
</script>

<div class="space-y-6">
  <Card class="space-y-2">
    <Label>Safe Content Zones</Label>
    <p class="text-sm text-content-muted">
      Container should be used to define safe zones so line length, scan
      patterns, and spacing remain stable across screens.
    </p>
  </Card>

  <div class="grid gap-4 desk:grid-cols-2">
    <Card class="space-y-3">
      <Label>xs</Label>
      <p class="text-sm text-content-muted">
        <span class="font-medium text-content">Use:</span>
        Auth forms, narrow dialogue boxes, and small focal point content.
        <br>
        <span class="font-medium text-content">Why:</span>
        Keeps extremely short-form content tight and centered.
      </p>
      <div
        class="rounded-md border border-dashed border-base-400 bg-base-100 p-2"
      >
        <Container
          size="xs"
          class="rounded-sm border border-base-400 bg-base-200 py-2 text-center text-xs text-content-muted"
        >
          <code class="font-mono">~448px</code>
        </Container>
      </div>
    </Card>

    <Card class="space-y-3">
      <Label>sm</Label>
      <p class="text-sm text-content-muted">
        <span class="font-medium text-content">Use:</span>
        Blogs, technical docs, privacy policies, and single-column settings.
        <br>
        <span class="font-medium text-content">Why:</span>
        Reading comfort around 70-80 characters per line.
      </p>
      <div
        class="rounded-md border border-dashed border-base-400 bg-base-100 p-2"
      >
        <Container
          size="sm"
          class="rounded-sm border border-base-400 bg-base-200 py-2 text-center text-xs text-content-muted"
        >
          <code class="font-mono">~768px</code>
        </Container>
      </div>
    </Card>

    <Card class="space-y-3">
      <Label>md</Label>
      <p class="text-sm text-content-muted">
        <span class="font-medium text-content">Use:</span>
        Main app views, project lists, standard dashboards, and landing pages.
        <br>
        <span class="font-medium text-content">Why:</span>
        Enough room for 3-4 Card grids without feeling overwhelming.
      </p>
      <div
        class="rounded-md border border-dashed border-base-400 bg-base-100 p-2"
      >
        <Container
          size="md"
          class="rounded-sm border border-base-400 bg-base-200 py-2 text-center text-xs text-content-muted"
        >
          <code class="font-mono">~1152px</code>
        </Container>
      </div>
    </Card>

    <Card class="space-y-3">
      <Label>lg</Label>
      <p class="text-sm text-content-muted">
        <span class="font-medium text-content">Use:</span>
        Dense infra views like database tables, logs, and full-screen code
        editors. <br>
        <span class="font-medium text-content">Why:</span>
        Leverages large engineer screens but caps width before UI elements feel
        disconnected.
      </p>
      <div
        class="rounded-md border border-dashed border-base-400 bg-base-100 p-2"
      >
        <Container
          size="lg"
          class="rounded-sm border border-base-400 bg-base-200 py-2 text-center text-xs text-content-muted"
        >
          <code class="font-mono">~1440px</code>
        </Container>
      </div>
    </Card>

    <Card class="space-y-3">
      <Label>xl</Label>
      <p class="text-sm text-content-muted">
        <span class="font-medium text-content">Use:</span>
        Only in root layout (<code class="font-mono text-xs"
          >+layout.svelte</code
        >) wrapping nav/sidebar/main canvas.
        <br>
        <span class="font-medium text-content">Why:</span>
        Absolute ultrawide cap and meta-container for the full app shell.
      </p>
      <div
        class="rounded-md border border-dashed border-base-400 bg-base-100 p-2"
      >
        <Container
          size="xl"
          class="rounded-sm border border-base-400 bg-base-200 py-2 text-center text-xs text-content-muted"
        >
          <code class="font-mono">1920px</code>
        </Container>
      </div>
    </Card>
  </div>
</div>
