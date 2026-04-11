<script lang="ts">
  import { Button, Card, Label, Switch } from "$lib/components/index.js";

  let active = $state(false);
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <Label>Variants & Colors</Label>
      <div class="flex items-center gap-2">
        <span class="text-xs text-content-muted">Force Active</span>
        <Switch bind:checked={active} size="sm" />
      </div>
    </div>
    <Card class="space-y-6 p-6">
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Solid
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Button {active} variant="solid" color="neutral">Neutral</Button>
          <Button {active} variant="solid" color="info">Info</Button>
          <Button {active} variant="solid" color="success">Success</Button>
          <Button {active} variant="solid" color="warning">Warning</Button>
          <Button {active} variant="solid" color="danger">Danger</Button>
        </div>
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
          >Outline</span
        >
        <div class="flex flex-wrap items-center gap-3">
          <Button {active} variant="outline" color="neutral">Neutral</Button>
          <Button {active} variant="outline" color="info">Info</Button>
          <Button {active} variant="outline" color="success">Success</Button>
          <Button {active} variant="outline" color="warning">Warning</Button>
          <Button {active} variant="outline" color="danger">Danger</Button>
        </div>
      </div>
      <div class="space-y-3">
        <span
          class="text-xs font-medium uppercase tracking-wider text-content-muted"
        >
          Ghost
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Button {active} variant="ghost" color="neutral">Neutral</Button>
          <Button {active} variant="ghost" color="info">Info</Button>
          <Button {active} variant="ghost" color="success">Success</Button>
          <Button {active} variant="ghost" color="warning">Warning</Button>
          <Button {active} variant="ghost" color="danger">Danger</Button>
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Sizes</Label>
    <Card class="flex flex-wrap items-end gap-6 p-6">
      <div class="flex flex-col items-center gap-2">
        <Button size="sm">Small</Button>
        <span class="text-xs text-content-muted">sm</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Button size="md">Medium</Button>
        <span class="text-xs text-content-muted">md</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Button size="lg">Large</Button>
        <span class="text-xs text-content-muted">lg</span>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>States & Radius</Label>
    <Card class="flex flex-wrap items-center gap-6 p-6">
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button radius="full">Full Rounded</Button>
      <Button radius="sm">Small Radius</Button>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Block Width</Label>
    <Card class="p-6"> <Button block>Full Width Button</Button> </Card>
  </div>
</div>
