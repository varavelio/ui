<script lang="ts">
  import { Card, Label, Textarea } from "$lib/components/index.js";
</script>

<div class="space-y-8">
  <div class="space-y-3">
    <Label>Variants & States</Label>
    <div class="grid grid-cols-1 desk:grid-cols-2 gap-4">
      <Card class="p-6 flex flex-col gap-4">
        <Label class="text-content-muted">Default Variant</Label>
        <Textarea placeholder="Normal state..." />
        <Textarea error placeholder="Error state..." value="Invalid input" />
        <Textarea disabled placeholder="Disabled state..." />
      </Card>
      <Card class="p-6 flex flex-col gap-4">
        <Label class="text-content-muted">Ghost Variant</Label>
        <Textarea variant="ghost" placeholder="Normal state..." />
        <Textarea
          variant="ghost"
          error
          placeholder="Error state..."
          value="Invalid input"
        />
        <Textarea variant="ghost" disabled placeholder="Disabled state..." />
      </Card>
    </div>
  </div>

  <div class="space-y-3">
    <Label>Resize Behavior</Label>
    <Card class="p-6">
      <div class="grid desk:grid-cols-3 gap-6 items-end">
        <div class="space-y-2">
          <Label>Vertical (Default)</Label>
          <Textarea resize="vertical" placeholder="resize='vertical'" />
        </div>
        <div class="space-y-2">
          <Label>None</Label>
          <Textarea resize="none" placeholder="resize='none'" />
        </div>
        <div class="space-y-2">
          <Label>Auto</Label>
          <Textarea resize="auto" placeholder="resize='auto'" />
        </div>
      </div>
    </Card>
  </div>

  <div class="space-y-3">
    <Label>Radius</Label>
    <Card class="p-6">
      <div class="grid desk:grid-cols-3 gap-4">
        <div class="space-y-2">
          <Label>none</Label>
          <Textarea radius="none" placeholder="none" rows={1} />
        </div>
        <div class="space-y-2">
          <Label>sm</Label>
          <Textarea radius="sm" placeholder="sm" rows={1} />
        </div>
        <div class="space-y-2">
          <Label>md</Label>
          <Textarea radius="md" placeholder="md" rows={1} />
        </div>
        <div class="space-y-2">
          <Label>lg</Label>
          <Textarea radius="lg" placeholder="lg" rows={1} />
        </div>
        <div class="space-y-2">
          <Label>full</Label>
          <Textarea radius="full" placeholder="full" rows={1} />
        </div>
      </div>
    </Card>
  </div>
</div>
