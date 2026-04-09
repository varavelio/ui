<script lang="ts">
  import { Button, Card, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Colors & Surfaces</Label>
    <div class="grid gap-6 desk:grid-cols-3">
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
          >Default</span
        >
        <Card color="default" class="h-full">
          <p class="text-sm">
            Standard container for most UI elements and sections.
          </p>
        </Card>
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
          >Muted</span
        >
        <Card color="muted" class="h-full">
          <p class="text-sm">
            Subtle background for nested content or less emphasis.
          </p>
        </Card>
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
          >Contrast</span
        >
        <Card color="contrast" class="h-full">
          <p class="text-sm">
            High-impact surface for hero sections or priority data.
          </p>
        </Card>
      </div>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Shadows & Borders</Label>
    <div class="grid gap-6 desk:grid-cols-3">
      <Card shadow="sm" bordered={false}>
        <Label>Small Shadow</Label>
        <p class="mt-2 text-sm text-content-muted">
          Unbordered card with a light elevation.
        </p>
      </Card>
      <Card shadow="md">
        <Label>Medium Shadow</Label>
        <p class="mt-2 text-sm text-content-muted">
          Standard elevation with a subtle border.
        </p>
      </Card>
      <Card shadow="lg">
        <Label>Large Shadow</Label>
        <p class="mt-2 text-sm text-content-muted">
          High elevation for prominent overlays.
        </p>
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Padding Presets</Label>
    <div class="flex flex-wrap items-start gap-6">
      <Card padding="sm" class="w-48">
        <span class="text-xs font-bold uppercase">Small</span>
        <p class="text-xs text-content-muted">Compact spacing.</p>
      </Card>
      <Card padding="md" class="w-48">
        <span class="text-xs font-bold uppercase">Medium</span>
        <p class="text-xs text-content-muted">Standard spacing.</p>
      </Card>
      <Card padding="lg" class="w-48">
        <span class="text-xs font-bold uppercase">Large</span>
        <p class="text-xs text-content-muted">Spacious layout.</p>
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Radius Options</Label>
    <div class="flex flex-wrap items-start gap-6">
      <Card radius="none" class="w-32 text-center">None</Card>
      <Card radius="md" class="w-32 text-center">Medium</Card>
      <Card radius="xl" class="w-32 text-center">Extra Large</Card>
      <Card radius="2xl" class="w-32 text-center">2XL Radius</Card>
    </div>
  </div>
</div>
