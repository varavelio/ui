<script lang="ts">
  import { Card, Input, Label } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Basic Input</Label>
    <Card class="max-w-sm space-y-4 p-6">
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" />
      </div>
      <div class="space-y-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" />
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Variants</Label>
    <Card class="flex flex-wrap gap-6 p-6">
      <div class="w-full max-w-50 space-y-2">
        <Label for="default-input">Default</Label>
        <Input id="default-input" placeholder="Standard field" />
      </div>
      <div class="w-full max-w-50 space-y-2">
        <Label for="ghost-input">Ghost</Label>
        <Input id="ghost-input" variant="ghost" placeholder="Subtle field" />
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes & Radius</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <div class="w-40 space-y-2">
        <Label for="sm-input">Small</Label>
        <Input id="sm-input" size="sm" placeholder="size='sm'" />
      </div>
      <div class="w-40 space-y-2">
        <Label for="md-input">Medium</Label>
        <Input id="md-input" size="md" placeholder="size='md'" />
      </div>
      <div class="w-40 space-y-2">
        <Label for="lg-input">Large</Label>
        <Input id="lg-input" size="lg" placeholder="size='lg'" />
      </div>
      <div class="w-40 space-y-2">
        <Label for="pill-input">Pill Radius</Label>
        <Input id="pill-input" radius="full" placeholder="radius='full'" />
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>States</Label>
    <Card class="flex flex-wrap gap-6 p-6">
      <div class="w-full max-w-50 space-y-2">
        <Label for="invalid-input" class="text-error">Error</Label>
        <Input id="invalid-input" error value="wrong@email" />
      </div>
      <div class="w-full max-w-50 space-y-2">
        <Label for="disabled-input">Disabled</Label>
        <Input id="disabled-input" disabled value="Not editable" />
      </div>
    </Card>
  </div>
</div>
